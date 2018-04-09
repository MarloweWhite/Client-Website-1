import os
from flask import Flask, request, render_template, redirect, make_response
from reportlab.pdfgen import canvas
import datetime
import sqlite3
import smtplib
from werkzeug.utils import secure_filename

#from flask_mail import Mail #Comment this out to test while email not finished.
#Importing appropriate packages to be used for functionality

DATABASE = 'AcornProjectDB.db'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
UPLOAD_FOLDER = '/cvFiles'

app = Flask(__name__)
app.config['cvFiles'] = UPLOAD_FOLDER

#mail = Mail(app) #Comment this out to test while email not finished.

@app.route("/Login", methods=['GET'])
def getLogin():
	return redirect("/static/index.html")

@app.route("/AddFormSubmission", methods = ['POST'])
def addFormSubmission():
	if request.method == 'POST': #Error handling on this? Or JS will take care of potential errors.
		#section 1
		title = request.form['title']
		count, new = 0, ""
		for char in title: #Loop to ensure first character entered is uppercase.
			letter = char
			if count == 0:
				letter = letter.upper()
			new = new + letter
			count += 1
		title = new

		fName = request.form['fName']
		lName = request.form['lName']
		dateOfBirth1 = request.form['dateOfBirth1']
		dateOfBirth2 = request.form['dateOfBirth2']
		dateOfBirth3 = request.form['dateOfBirth3']
		dateOfBirth = dateOfBirth1+"/"+dateOfBirth2+"/"+dateOfBirth3
		natInsNum1 = request.form['natInNum1']
		natInsNum2 = request.form['natInNum2']
		natInsNum3 = request.form['natInNum3']
		natInsNum4 = request.form['natInNum4']
		natInsNum5 = request.form['natInNum5']
		nationalInsuranceNum = natInsNum1+" "+natInsNum2+" "+natInsNum3+" "+natInsNum4+" "+natInsNum5
		adLine1 = request.form['adLine1']
		adLine2 = request.form['adLine2']
		pCode1 = request.form['pCode1']
		pCode2 = request.form['pCode2']
		contactNum = request.form['contactNum']
		eContactName = request.form['eContactName']
		eContactNum = request.form['eContactNum']
		quals1 = request.form['quals1']
		quals2 = request.form['quals2']
		quals3 = request.form['quals3']
		companyType = request.form['companyType']
		companyName = request.form['companyName']
		#section 2
		eligibleUK = request.form['eligibleUK']
		eligibleUKDocs1 = request.form['eligibleUKDocs1']
		eligibleUKDocs2 = request.form['eligibleUKDocs2']
		eligibleUKDocs3 = request.form['eligibleUKDocs3']
		ukDrive = request.form['ukDrive']
		crimCheck = request.form['crimCheck']
		crimInfo = request.form['crimInfo']
		disCheck = request.form['disCheck']
		disInfo = request.form['disInfo']
		#section 3
		r1fName = request.form['r1fName']
		r1lName = request.form['r1lName']
		r1jobTitle = request.form['r1jobTitle']
		r1companyName = request.form['r1companyName']
		r1adLine1 = request.form['r1adLine1']
		r1adLine2 = request.form['r1adLine2']
		r1pCode1 = request.form['r1pCode1']
		r1pCode2 = request.form['r1pCode2']
		r1contactNumber = request.form['r1contactNumber']
		r1emailAddress = request.form['r1emailAddress']
		r2fName = request.form['r2fName']
		r2lName = request.form['r2lName']
		r2jobTitle = request.form['r2jobTitle']
		r2companyName = request.form['r2companyName']
		r2adLine1 = request.form['r2adLine1']
		r2adLine2 = request.form['r2adLine2']
		r2pCode1 = request.form['r2pCode1']
		r2pCode2 = request.form['r2pCode2']
		r2contactNumber = request.form['r2contactNumber']
		r2emailAddress = request.form['r2emailAddress']
		userEmail = request.form['userEmail']
		#Variables below for form creation as PDF;
		fullName = title+" "+fName+" "+lName
		fullAddressLine = adLine1+", "+adLine2
		fullPostcode = pCode1+" "+pCode2
		emergencyContact = "Name: "+eContactName+", Number: "+eContactNum
		fullQuals = quals1+", "+quals2+", "+quals3
		if eligibleUKDocs2 != "":
			if eligibleUKDocs3 != "":
				fullEligibleDocs = eligibleUKDocs1+", "+eligibleUKDocs2+", "+eligibleUKDocs3
			else:
				fullEligibleDocs = eligibleUKDocs1+", "+eligibleUKDocs2
		else:
			fullEligibleDocs = eligibleUKDocs1
		r1fullName = r1fName+" "+r1lName
		r1fullAddressLine = r1adLine1+", "+r1adLine2
		r1fullPostcode = r2pCode1+" "+r2pCode2
		r2fullName = r2fName+" "+r2lName
		r2fullAddressLine = r2adLine1+", "+r2adLine2
		r2fullPostcode = r2pCode1+" "+r2pCode2
		todays_date = str(datetime.date.today())

		try:
			pdfName = fName+"_"+lName+"_"+todays_date+".pdf"
			save_pdf_filepath_as = os.path.join(os.path.expanduser("~"), "Desktop/Client-Project-Acorn/pdfFiles", pdfName)
			c = canvas.Canvas(save_pdf_filepath_as) #creates blank document
			drawPDF(c, fullName, dateOfBirth, nationalInsuranceNum, fullAddressLine, fullPostcode, contactNum, emergencyContact, fullQuals, companyType, companyName, eligibleUK, fullEligibleDocs, ukDrive, crimCheck, crimInfo, disCheck, disInfo, r1fullName, r1jobTitle, r1companyName, r1fullAddressLine, r1fullPostcode, r1contactNumber, r1emailAddress, r2fullName, r2jobTitle, r2companyName, r2fullAddressLine, r2fullPostcode, r2contactNumber, r2emailAddress, todays_date)
			#Help gathered to write this code from : https://www.reportlab.com/docs/reportlab-userguide.pdf
		except Exception as issue:
			print("Issue creating pdf and saving form to it....")
			print(issue)

		print("Inserting form submission record for: ", fName)
		try:
			conn = sqlite3.connect(DATABASE)
			cur = conn.cursor()
			cur.execute("INSERT INTO frmMainFormSubs \
			('title', 'fName', 'lName', 'dateOfBirth', 'nationalIN', 'adLine1', 'adLine2', 'pCode1', 'pCode2', 'contactNum', 'eContactName', 'eContactNum', 'quals1', 'quals2', 'quals3', 'companyType', 'companyName', 'eligibleUK', 'eligibleUKDocs1', 'eligibleUKDocs2', 'eligibleUKDocs3', 'ukDrive', 'crimCheck', 'crimInfo', 'disCheck', 'disInfo', 'ref1Name', 'ref1jobTitle', 'ref1companyName', 'ref1adLines', 'ref1pCode', 'ref1contactNumber', 'ref1emailAddress', 'ref2Name', 'ref2jobTitle', 'ref2companyName', 'ref2adLines', 'ref2pCode', 'ref2contactNumber', 'ref2emailAddress', 'dateOfSub')\
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",(title, fName, lName, dateOfBirth, nationalInsuranceNum, adLine1, adLine2, pCode1, pCode2, contactNum, eContactName, eContactNum, quals1, quals2, quals3, companyType, companyName, eligibleUK, eligibleUKDocs1, eligibleUKDocs2, eligibleUKDocs3, ukDrive, crimCheck, crimInfo, disCheck, disInfo, r1fullName, r1jobTitle, r1companyName, r1fullAddressLine, r1fullPostcode, r1contactNumber, r1emailAddress, r1fullName, r2jobTitle, r2companyName, r2fullAddressLine, r2fullPostcode, r2contactNumber, r2emailAddress, todays_date))

			conn.commit()
			msg = ""
		except Exception as e:
			conn.rollback()
			msg = "Error with signup submission - please ensure your please contact Acorn Recruitment LTD: issue "+str(e)
		finally:
			conn.close()
			if msg != "":
				return msg
			else :
				return redirect('/static/thankyou.html')

def drawPDF(c, fullName, dateOfBirth, nationalInsuranceNum, fullAddressLine, fullPostcode, contactNum, emergencyContact, fullQuals, companyType, companyName, eligibleUK, fullEligibleDocs, ukDrive, crimCheck, crimInfo, disCheck, disInfo, r1fullName, r1jobTitle, r1companyName, r1fullAddressLine, r1fullPostcode, r1contactNumber, r1emailAddress, r2fullName, r2jobTitle, r2companyName, r2fullAddressLine, r2fullPostcode, r2contactNumber, r2emailAddress, todays_date):
	print("Starting to create PDF content.")
	c.drawImage('logoandguidelines/Logos/PNGs/logo.png', 450, 785, 120, 40)
	c.setFont("Helvetica-Bold", 11)
	c.drawString(20, 800, "CV for "+fullName)
	c.setFont("Helvetica", 11)
	c.drawString(20, 760, "Date of Birth: "+dateOfBirth)
	c.drawString(20, 740, "National Insurance Number: "+nationalInsuranceNum)
	c.drawString(20, 720, "Address: "+fullAddressLine)
	c.drawString(20, 700, "Postcode: "+fullPostcode)
	c.drawString(20, 680, "Contact Number: "+contactNum)
	c.drawString(20, 660, "Emergency Contact: "+emergencyContact)
	c.drawString(20, 640, "Qualifications: "+fullQuals)
	c.drawString(20, 620, "Company Type: "+companyType)
	c.drawString(20, 600, "Company Name: "+companyName)
	c.drawString(20, 580, "Eligible to Work in the UK? "+eligibleUK)
	c.drawString(20, 560, "Detail of Documents to be Provided: "+fullEligibleDocs)
	c.drawString(20, 520, "Holds a Current Valid UK Driving Licence? "+ukDrive)
	c.drawString(20, 500, "Any Unspent Criminal Convictions? "+crimCheck)
	c.drawString(20, 480, "If yes, detailing: "+crimInfo)
	c.drawString(20, 440, "Disability? "+disCheck)
	c.drawString(20, 420, "If yes, detailing: "+disInfo)
	c.setFont("Helvetica-Bold", 11)
	c.drawString(20, 380, "Referee 1")
	c.setFont("Helvetica", 11)
	c.drawString(20, 360, "Name: "+r1fullName)
	c.drawString(20, 340, "Job Title: "+r1jobTitle)
	c.drawString(20, 320, "Company: "+r1companyName)
	c.drawString(20, 300, "Address: "+r1fullAddressLine)
	c.drawString(20, 280, "Postcode: "+r1fullPostcode)
	c.drawString(20, 260, "Contact Number: "+r1contactNumber)
	c.drawString(20, 240, "Email Address: "+r1emailAddress)
	c.setFont("Helvetica-Bold", 11)
	c.drawString(20, 220, "Referee 2")
	c.setFont("Helvetica", 11)
	c.drawString(20, 200, "Name: "+r2fullName)
	c.drawString(20, 180, "Job Title: "+r2jobTitle)
	c.drawString(20, 160, "Company: "+r2companyName)
	c.drawString(20, 140, "Address: "+r2fullAddressLine)
	c.drawString(20, 120, "Postcode: "+r2fullPostcode)
	c.drawString(20, 100, "Contact Number: "+r2contactNumber)
	c.drawString(20, 80, "Email Address: "+r2emailAddress)
	c.setFont("Helvetica-Oblique", 11)
	c.drawString(20, 40, "[Submission Date: "+todays_date+"]")

	c.rect(10, 73, 575, 20, stroke=1, fill=0) #x, y, width, height, stroke, fill
	c.rect(10, 93, 575, 20, stroke=1, fill=0)
	c.rect(10, 113, 575, 20, stroke=1, fill=0)
	c.rect(10, 133, 575, 20, stroke=1, fill=0)
	c.rect(10, 153, 575, 20, stroke=1, fill=0)
	c.rect(10, 173, 575, 20, stroke=1, fill=0)
	c.rect(10, 193, 575, 20, stroke=1, fill=0)
	c.rect(10, 233, 575, 20, stroke=1, fill=0)
	c.rect(10, 253, 575, 20, stroke=1, fill=0)
	c.rect(10, 273, 575, 20, stroke=1, fill=0)
	c.rect(10, 293, 575, 20, stroke=1, fill=0)
	c.rect(10, 313, 575, 20, stroke=1, fill=0)
	c.rect(10, 333, 575, 20, stroke=1, fill=0)
	c.rect(10, 353, 575, 20, stroke=1, fill=0)
	c.rect(10, 393, 575, 40, stroke=1, fill=0)
	c.rect(10, 433, 575, 20, stroke=1, fill=0)
	c.rect(10, 453, 575, 40, stroke=1, fill=0)
	c.rect(10, 493, 575, 20, stroke=1, fill=0)
	c.rect(10, 513, 575, 20, stroke=1, fill=0)
	c.rect(10, 533, 575, 40, stroke=1, fill=0)
	c.rect(10, 573, 575, 20, stroke=1, fill=0)
	c.rect(10, 593, 575, 20, stroke=1, fill=0)
	c.rect(10, 613, 575, 20, stroke=1, fill=0)
	c.rect(10, 633, 575, 20, stroke=1, fill=0)
	c.rect(10, 653, 575, 20, stroke=1, fill=0)
	c.rect(10, 673, 575, 20, stroke=1, fill=0)
	c.rect(10, 693, 575, 20, stroke=1, fill=0)
	c.rect(10, 713, 575, 20, stroke=1, fill=0)
	c.rect(10, 733, 575, 20, stroke=1, fill=0)
	c.rect(10, 753, 575, 20, stroke=1, fill=0)

	c.showPage() #saves document in its current state
	c.save() #saves document to pdf files directory

#def sendPdf(pdfName, userEmail): #Comment this function out to test while email not finished.
#    msg = Message("Here is "+fName + "'s PDF",sender=userEmail,
#                      recipients=["jackjblundell@gmail.com"])
#
#
#    mail.send(msg)


@app.route("/addUser", methods = ['POST'])
def addUserSignUp():
	if request.method == 'POST': #Error handling on this? Or JS will take care of potential errors.
		title = request.form['title']
		fName = request.form['fName']
		lName = request.form['lName']
		dateOfBirth1 = request.form['dateOfBirth1']
		dateOfBirth2 = request.form['dateOfBirth2']
		dateOfBirth3 = request.form['dateOfBirth3']
		dateOfBirth = dateOfBirth1+"/"+dateOfBirth2+"/"+dateOfBirth3
		natInsNum1 = request.form['natInNum1']
		natInsNum2 = request.form['natInNum2']
		natInsNum3 = request.form['natInNum3']
		natInsNum4 = request.form['natInNum4']
		natInsNum5 = request.form['natInNum5']
		nationalInsuranceNum = natInsNum1+" "+natInsNum2+" "+natInsNum3+" "+natInsNum4+" "+natInsNum5
		adLine1 = request.form['adLine1']
		adLine2 = request.form['adLine2']
		pCode1 = request.form['pCode1']
		pCode2 = request.form['pCode2']
		contactNum = request.form['contactNumber']
		eContactName = request.form['eContactName']
		eContactNum = request.form['eContactNumber']
		quals1 = request.form['quals1']
		quals2 = request.form['quals2']
		quals3 = request.form['quals3']
		companyType = request.form['companyType']
		companyName = request.form['companyName']
		eligibleUK = request.form['eligibleUK']
		eligibleUKDocs1 = request.form['eligibleUKDocs1']
		eligibleUKDocs2 = request.form['eligibleUKDocs2']
		eligibleUKDocs3 = request.form['eligibleUKDocs3']
		ukDrive = request.form['ukDrive']
		crimCheck = request.form['crimCheck']
		crimInfo = request.form['crimInfo']
		disCheck = request.form['disCheck']
		disInfo = request.form['disInfo']
		uEmail = request.form['uEmail']
		uPassword = request.form['uPassword']

		print("Inserting sign up record for: ", fName)
		try:
			conn = sqlite3.connect(DATABASE)
			cur = conn.cursor()
			cur.execute("INSERT INTO frmSignUps \
			('title', 'fName', 'lName', 'dateOfBirth', 'nationalIN', 'adLine1', 'adLine2', 'pCode1', 'pCode2', 'contactNum', 'eContactName', 'eContactNum', 'quals1', 'quals2', 'quals3', 'companyType', 'companyName', 'eligibleUK', 'eligibleUKDocs1', 'eligibleUKDocs2', 'eligibleUKDocs3', 'ukDrive', 'crimCheck', 'crimInfo', 'disCheck', 'disInfo', 'uEmail', 'uPassword')\
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",(title, fName, lName, dateOfBirth, nationalInsuranceNum, adLine1, adLine2, pCode1, pCode2, contactNum, eContactName, eContactNum, quals1, quals2, quals3, companyType, companyName, eligibleUK, eligibleUKDocs1, eligibleUKDocs2, eligibleUKDocs3, ukDrive, crimCheck, crimInfo, disCheck, disInfo, uEmail, uPassword))

			cur.execute("INSERT INTO frmLogins \
			('email', 'password')\
			VALUES (?, ?)", (uEmail, uPassword))

			conn.commit()
			msg = ""
		except Exception as e:
			conn.rollback()
			msg = "Error with signup submission - please contact Acorn Recruitment LTD: issue "+str(e)
		finally:
			conn.close()
			if msg != "":
				return msg
			else:
				return redirect("/static/index.html")

@app.route("/loginUser", methods = ['POST'])
def login():
	if request.method == 'POST':
		try:
			uEmail = request.form.get('uEmail', default="Error")
			uPassword = request.form.get('uPassword', default="Error")
			conn = sqlite3.connect(DATABASE)
			cur = conn.cursor()
			cur.execute("SELECT * FROM frmLogins WHERE email=? AND password=? AND access_level='2' ;", [uEmail, uPassword])
			data = cur.fetchall()
			print(data)
		except:
			print('there was an error', data)
			connn.close()

		finally:
			conn.close()
			if str(data) == "[]":
				return redirect("/static/index.html")
			else:
				return redirect("/static/AcornProjectForm.html")


@app.route("/loginAdmin", methods = ['POST'])
def loginAdmin():
	if request.method == 'POST':
		try:
			uEmailA = request.form.get('uEmailA', default="Error")
			uPasswordA = request.form.get('uPasswordA', default="Error")
			conn = sqlite3.connect(DATABASE)
			cur = conn.cursor()
			cur.execute("SELECT * FROM frmLogins WHERE email=? AND password=? AND access_level='1' ;", [uEmailA, uPasswordA])
			data = cur.fetchall()
			print(data)
		except:
			print('there was an error', data)
			connn.close()

		finally:
			conn.close()
			if str(data) == "[]":
				return redirect("/static/index.html")
			else:
				return redirect("/static/adminPage.html")

@app.route("/Admin", methods = ['GET'])
def admin():
	if request.method == "GET" :
		return render_template("adminPage.html")

@app.route("/Users", methods = ['GET'])
def User():
	if request.method == "GET":
		return render_template("userPage.html")

@app.route("/Jobs", methods = ['GET'])
def Jobs():
	if request.method == "GET":
		return render_template("jobPage.html")

@app.route("/addUser", methods = ['GET','POST'])
def addUser():
	if request.method == "GET":
		return render_template("addUser.html")
	if request.method == "POST":
		try:
			title = request.form['title']
			fName = request.form['fName']
			lName = request.form['lName']
			dateOfBirth1 = request.form['dateOfBirth1']
			dateOfBirth2 = request.form['dateOfBirth2']
			dateOfBirth3 = request.form['dateOfBirth3']
			dateOfBirth = dateOfBirth1+"/"+dateOfBirth2+"/"+dateOfBirth3
			natInsNum1 = request.form['natInNum1']
			natInsNum2 = request.form['natInNum2']
			natInsNum3 = request.form['natInNum3']
			natInsNum4 = request.form['natInNum4']
			natInsNum5 = request.form['natInNum5']
			nationalInsuranceNum = natInsNum1+" "+natInsNum2+" "+natInsNum3+" "+natInsNum4+" "+natInsNum5
			adLine1 = request.form['adLine1']
			adLine2 = request.form['adLine2']
			pCode1 = request.form['pCode1']
			pCode2 = request.form['pCode2']
			contactNum = request.form['contactNumber']
			eContactName = request.form['eContactName']
			eContactNum = request.form['eContactNumber']
			quals1 = request.form['quals1']
			quals2 = request.form['quals2']
			quals3 = request.form['quals3']
			companyType = request.form['companyType']
			companyName = request.form['companyName']
			eligibleUK = request.form['eligibleUK']
			eligibleUKDocs1 = request.form['eligibleUKDocs1']
			eligibleUKDocs2 = request.form['eligibleUKDocs2']
			eligibleUKDocs3 = request.form['eligibleUKDocs3']
			ukDrive = request.form['ukDrive']
			crimCheck = request.form['crimCheck']
			crimInfo = request.form['crimInfo']
			disCheck = request.form['disCheck']
			disInfo = request.form['disInfo']
			uEmail = request.form['uEmail']
			uPassword = request.form['uPassword']

			print("Inserting sign up record for: ", fName)
			try:
				conn = sqlite3.connect(DATABASE)
				cur = conn.cursor()
				cur.execute("INSERT INTO frmSignUps \
				('title', 'fName', 'lName', 'dateOfBirth', 'nationalIN', 'adLine1', 'adLine2', 'pCode1', 'pCode2', 'contactNum', 'eContactName', 'eContactNum', 'quals1', 'quals2', 'quals3', 'companyType', 'companyName', 'eligibleUK', 'eligibleUKDocs1', 'eligibleUKDocs2', 'eligibleUKDocs3', 'ukDrive', 'crimCheck', 'crimInfo', 'disCheck', 'disInfo', 'uEmail', 'uPassword')\
				VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",(title, fName, lName, dateOfBirth, nationalInsuranceNum, adLine1, adLine2, pCode1, pCode2, contactNum, eContactName, eContactNum, quals1, quals2, quals3, companyType, companyName, eligibleUK, eligibleUKDocs1, eligibleUKDocs2, eligibleUKDocs3, ukDrive, crimCheck, crimInfo, disCheck, disInfo, uEmail, uPassword))

				cur.execute("INSERT INTO frmLogins \
				('email', 'password')\
				VALUES (?, ?)", (uEmail, uPassword))

				conn.commit()
				msg = ""
			except Exception as e:
				conn.rollback()
				msg = "Error with server: issue "+str(e)
			finally:
				conn.close()
				if msg != "":
					return msg
				else:
					return redirect("/static/index.html")
		except Exception as e:
			return render.template("error.html", msg="Error adding information to table")

@app.route("/searchUsers", methods = ['GET'])
def searchUser():
	if request.method == "GET":
		return render_template("searchUsers.html")

@app.route("/addJob", methods = ['GET','POST'])
def addJob():
	if request.method == "GET":
		return render_template("addJob.html")
	if request.method == 'POST': #Error handling on this? Or JS will take care of potential errors.
		#section 1
		title = request.form['title']
		count, new = 0, ""
		for char in title: #Loop to ensure first character entered is uppercase.
			letter = char
			if count == 0:
				letter = letter.upper()
			new = new + letter
			count += 1
		title = new

		fName = request.form['fName']
		lName = request.form['lName']
		dateOfBirth1 = request.form['dateOfBirth1']
		dateOfBirth2 = request.form['dateOfBirth2']
		dateOfBirth3 = request.form['dateOfBirth3']
		dateOfBirth = dateOfBirth1+"/"+dateOfBirth2+"/"+dateOfBirth3
		natInsNum1 = request.form['natInNum1']
		natInsNum2 = request.form['natInNum2']
		natInsNum3 = request.form['natInNum3']
		natInsNum4 = request.form['natInNum4']
		natInsNum5 = request.form['natInNum5']
		nationalInsuranceNum = natInsNum1+" "+natInsNum2+" "+natInsNum3+" "+natInsNum4+" "+natInsNum5
		adLine1 = request.form['adLine1']
		adLine2 = request.form['adLine2']
		pCode1 = request.form['pCode1']
		pCode2 = request.form['pCode2']
		contactNum = request.form['contactNum']
		eContactName = request.form['eContactName']
		eContactNum = request.form['eContactNum']
		quals1 = request.form['quals1']
		quals2 = request.form['quals2']
		quals3 = request.form['quals3']
		companyType = request.form['companyType']
		companyName = request.form['companyName']
		#section 2
		eligibleUK = request.form['eligibleUK']
		eligibleUKDocs1 = request.form['eligibleUKDocs1']
		eligibleUKDocs2 = request.form['eligibleUKDocs2']
		eligibleUKDocs3 = request.form['eligibleUKDocs3']
		ukDrive = request.form['ukDrive']
		crimCheck = request.form['crimCheck']
		crimInfo = request.form['crimInfo']
		disCheck = request.form['disCheck']
		disInfo = request.form['disInfo']
		#section 3
		r1fName = request.form['r1fName']
		r1lName = request.form['r1lName']
		r1jobTitle = request.form['r1jobTitle']
		r1companyName = request.form['r1companyName']
		r1adLine1 = request.form['r1adLine1']
		r1adLine2 = request.form['r1adLine2']
		r1pCode1 = request.form['r1pCode1']
		r1pCode2 = request.form['r1pCode2']
		r1contactNumber = request.form['r1contactNumber']
		r1emailAddress = request.form['r1emailAddress']
		r2fName = request.form['r2fName']
		r2lName = request.form['r2lName']
		r2jobTitle = request.form['r2jobTitle']
		r2companyName = request.form['r2companyName']
		r2adLine1 = request.form['r2adLine1']
		r2adLine2 = request.form['r2adLine2']
		r2pCode1 = request.form['r2pCode1']
		r2pCode2 = request.form['r2pCode2']
		r2contactNumber = request.form['r2contactNumber']
		r2emailAddress = request.form['r2emailAddress']
		userEmail = request.form['userEmail']
		#Variables below for form creation as PDF;
		fullName = title+" "+fName+" "+lName
		fullAddressLine = adLine1+", "+adLine2
		fullPostcode = pCode1+" "+pCode2
		emergencyContact = "Name: "+eContactName+", Number: "+eContactNum
		fullQuals = quals1+", "+quals2+", "+quals3
		if eligibleUKDocs2 != "":
			if eligibleUKDocs3 != "":
				fullEligibleDocs = eligibleUKDocs1+", "+eligibleUKDocs2+", "+eligibleUKDocs3
			else:
				fullEligibleDocs = eligibleUKDocs1+", "+eligibleUKDocs2
		else:
			fullEligibleDocs = eligibleUKDocs1
		r1fullName = r1fName+" "+r1lName
		r1fullAddressLine = r1adLine1+", "+r1adLine2
		r1fullPostcode = r2pCode1+" "+r2pCode2
		r2fullName = r2fName+" "+r2lName
		r2fullAddressLine = r2adLine1+", "+r2adLine2
		r2fullPostcode = r2pCode1+" "+r2pCode2
		todays_date = str(datetime.date.today())

		try:
			pdfName = fName+"_"+lName+"_"+todays_date+".pdf"
			save_pdf_filepath_as = os.path.join(os.path.expanduser("~"), "Desktop/Client-Project-Acorn/pdfFiles", pdfName)
			c = canvas.Canvas(save_pdf_filepath_as) #creates blank document
			drawPDF(c, fullName, dateOfBirth, nationalInsuranceNum, fullAddressLine, fullPostcode, contactNum, emergencyContact, fullQuals, companyType, companyName, eligibleUK, fullEligibleDocs, ukDrive, crimCheck, crimInfo, disCheck, disInfo, r1fullName, r1jobTitle, r1companyName, r1fullAddressLine, r1fullPostcode, r1contactNumber, r1emailAddress, r2fullName, r2jobTitle, r2companyName, r2fullAddressLine, r2fullPostcode, r2contactNumber, r2emailAddress, todays_date)
			#Help gathered to write this code from : https://www.reportlab.com/docs/reportlab-userguide.pdf
		except Exception as issue:
			print("Issue creating pdf and saving form to it....")
			print(issue)

		print("Inserting form submission record for: ", fName)
		try:
			conn = sqlite3.connect(DATABASE)
			cur = conn.cursor()
			cur.execute("INSERT INTO frmMainFormSubs \
			('title', 'fName', 'lName', 'dateOfBirth', 'nationalIN', 'adLine1', 'adLine2', 'pCode1', 'pCode2', 'contactNum', 'eContactName', 'eContactNum', 'quals1', 'quals2', 'quals3', 'companyType', 'companyName', 'eligibleUK', 'eligibleUKDocs1', 'eligibleUKDocs2', 'eligibleUKDocs3', 'ukDrive', 'crimCheck', 'crimInfo', 'disCheck', 'disInfo', 'ref1Name', 'ref1jobTitle', 'ref1companyName', 'ref1adLines', 'ref1pCode', 'ref1contactNumber', 'ref1emailAddress', 'ref2Name', 'ref2jobTitle', 'ref2companyName', 'ref2adLines', 'ref2pCode', 'ref2contactNumber', 'ref2emailAddress', 'dateOfSub')\
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",(title, fName, lName, dateOfBirth, nationalInsuranceNum, adLine1, adLine2, pCode1, pCode2, contactNum, eContactName, eContactNum, quals1, quals2, quals3, companyType, companyName, eligibleUK, eligibleUKDocs1, eligibleUKDocs2, eligibleUKDocs3, ukDrive, crimCheck, crimInfo, disCheck, disInfo, r1fullName, r1jobTitle, r1companyName, r1fullAddressLine, r1fullPostcode, r1contactNumber, r1emailAddress, r1fullName, r2jobTitle, r2companyName, r2fullAddressLine, r2fullPostcode, r2contactNumber, r2emailAddress, todays_date))

			conn.commit()
			msg = ""
		except Exception as e:
			conn.rollback()
			msg = "Error with signup submission - please ensure your please contact Acorn Recruitment LTD: issue "+str(e)
		finally:
			conn.close()
			if msg != "":
				return msg
			else :
				return redirect('/static/thankyou.html')


@app.route("/Search/Jobs", methods = ['GET','POST'])
def searchJob():
	if request.method == "GET":
		return render_template("searchJobs.html")
	if request.method == "POST":
			try:
				fName = request.form.get('userSearch', default="Error") #rem: args for get form for post
				conn = sqlite3.connect(DATABASE)
				cur = conn.cursor()
				# cur.execute("SELECT * FROM Students WHERE surname=? AND public = 'True';", [surname])
				cur.execute("SELECT * FROM frmMainFormSubs WHERE fName=? ;", [fName])
				data = cur.fetchall()
				print(data)
			except:
				print('there was an error', data)
				conn.close()
			finally:
				conn.close()
				return str(data)


def allowed_file(filename):
	return '.' in filename and \
		   filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/CV', methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		# check if the post request has the file part
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		# if user does not select file, browser also
		# submit a empty part without filename
		if file.filename == '':
			flash('No selected file')
			return redirect(request.url)
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['cvFiles'], filename))
			return redirect(url_for('uploaded_file',
									filename=filename))
			print('CV saved')


if __name__ == "__main__":
	app.run(debug=True)
