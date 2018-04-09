//If uncommented, the below JQuery syntax calls the JS function into play.
//However, not sure how to now stop the form from submitting at all!
//If want to use this JQuery, in the HTML doc, un comment line 198. Else, JS function being called on button click straight away.
//$(document).ready(function() {
//  $("#buttonclick").on("click", function(){
//    validateForm()
//  });
//});

function validateFormSubmission() {
  var pass = true;
  var list_of_form_input_values = [];
  var list_of_form_input_titles= [];
  var list_of_failed_input_titles = []; //for inputs which are empty
  var ninRegex = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z][0-9][0-9][0-9][0-9][0-9][0-9][A-DFM]$/;
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var numberRegex = /^0\d{10}$/;
  var DoBRegex = /^[0-9]+$/;
  //Gathering user input from AcornFormPart1 - accessing the DOM.
  //section 1

  var title = (document.forms["AcornForm"]["title"].value);
  list_of_form_input_values.push(title);
  list_of_form_input_titles.push('Title');
  var fName = (document.forms["AcornForm"]["fName"].value);
  list_of_form_input_values.push(fName);
  list_of_form_input_titles.push('Firstname');
  var lName = (document.forms["AcornForm"]["lName"].value);
  list_of_form_input_values.push(lName);
  list_of_form_input_titles.push('Lastname');
  var dateOfBirth1 = (document.forms["AcornForm"]["dateOfBirth1"].value);
  var dateOfBirth2 = (document.forms["AcornForm"]["dateOfBirth2"].value);
  var dateOfBirth3 = (document.forms["AcornForm"]["dateOfBirth3"].value);
  var dateOfBirth = dateOfBirth1+"/"+dateOfBirth2+"/"+dateOfBirth3
  list_of_form_input_values.push(dateOfBirth);
  list_of_form_input_titles.push('Date of Birth');
  var natInsNum1 = (document.forms["AcornForm"]["natInNum1"].value);
  var natInsNum2 = (document.forms["AcornForm"]["natInNum2"].value);
  var natInsNum3 = (document.forms["AcornForm"]["natInNum3"].value);
  var natInsNum4 = (document.forms["AcornForm"]["natInNum4"].value);
  var natInsNum5 = (document.forms["AcornForm"]["natInNum5"].value);
  var natInsNum = natInsNum1+" "+natInsNum2+" "+natInsNum3+" "+natInsNum4+" "+natInsNum5
  list_of_form_input_values.push(natInsNum);
  list_of_form_input_titles.push('National Insurance Number');
  var adLine1 = (document.forms["AcornForm"]["adLine1"].value);
  list_of_form_input_values.push(adLine1);
  list_of_form_input_titles.push('Address Line 1');
  var adLine2 = (document.forms["AcornForm"]["adLine2"].value);
  list_of_form_input_values.push(adLine2);
  list_of_form_input_titles.push('Address Line 2');
  var pCode1 = (document.forms["AcornForm"]["pCode1"].value);
  list_of_form_input_values.push(pCode1);
  list_of_form_input_titles.push('PostCode Box 1');
  var pCode2 = (document.forms["AcornForm"]["pCode2"].value);
  list_of_form_input_values.push(pCode2);
  list_of_form_input_titles.push('PostCode Box 2');
  var contactNum = (document.forms["AcornForm"]["contactNum"].value);
  list_of_form_input_values.push(contactNum);
  list_of_form_input_titles.push('Contact Number');
  var eContactName = (document.forms["AcornForm"]["eContactName"].value);
  list_of_form_input_values.push(eContactName);
  list_of_form_input_titles.push('Emergency Contact Name');
  var eContactNum = (document.forms["AcornForm"]["eContactNum"].value);
  list_of_form_input_values.push(eContactNum);
  list_of_form_input_titles.push('Emergency Contact Number');
  var quals1 = (document.forms["AcornForm"]["quals1"].value);
  list_of_form_input_values.push(quals1);
  list_of_form_input_titles.push('Qualification 1');
  var quals2 = (document.forms["AcornForm"]["quals2"].value);
  list_of_form_input_values.push(quals2);
  list_of_form_input_titles.push('Qualification 2');
  var quals3 = (document.forms["AcornForm"]["quals3"].value);
  list_of_form_input_values.push(quals3);
  list_of_form_input_titles.push('Qualification 3');
  var companyType = (document.forms["AcornForm"]["companyType"].value); //radioInput, only one checkbox can be ticked - value could be; umbrellaCompany, personalServices, or empty ""
  list_of_form_input_values.push(companyType);
  list_of_form_input_titles.push('Company Type');
  var companyName = (document.forms["AcornForm"]["companyName"].value);

  //section 2
  var eligibleUK = (document.forms["AcornForm"]["eligibleUK"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(eligibleUK);
  list_of_form_input_titles.push('Are You Eligible to Work in the UK?');
  var eligibleUKDocs1 = (document.forms["AcornForm"]["eligibleUKDocs1"].value);
  var eligibleUKDocs2 = (document.forms["AcornForm"]["eligibleUKDocs2"].value);
  //No check - at least 1 document needs to be detailed.
  var eligibleUKDocs3 = (document.forms["AcornForm"]["eligibleUKDocs3"].value);
  //No check - at least 1 document needs to be detailed.
  var ukDrive = (document.forms["AcornForm"]["ukDrive"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(ukDrive);
  list_of_form_input_titles.push('Do You Hold a Current UK Driving Licence?');
  var crimCheck = (document.forms["AcornForm"]["crimCheck"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(crimCheck);
  list_of_form_input_titles.push('Any Unspent Criminal Convictions?');
  var crimInfo = (document.forms["AcornForm"]["crimInfo"].value);
  var disCheck = (document.forms["AcornForm"]["disCheck"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(disCheck);
  list_of_form_input_titles.push('Disability');
  var disInfo = (document.forms["AcornForm"]["disInfo"].value);
  //var submitDate = new Date()

  //section 3
  var r1fName = (document.forms["AcornForm"]["r1fName"].value);
  list_of_form_input_values.push(r1fName);
  list_of_form_input_titles.push('r1Firstname');
  var r1lName = (document.forms["AcornForm"]["r1lName"].value);
  list_of_form_input_values.push(r1lName);
  list_of_form_input_titles.push('r1Lastname');
  var r1jobTitle = (document.forms["AcornForm"]["r1jobTitle"].value);
  list_of_form_input_values.push(r1jobTitle);
  list_of_form_input_titles.push('r1jobTitle');
  var r1companyName = (document.forms["AcornForm"]["r1companyName"].value);
  list_of_form_input_values.push(r1companyName);
  list_of_form_input_titles.push('r1companyName');
  var r1adLine1 = (document.forms["AcornForm"]["r1adLine1"].value);
  list_of_form_input_values.push(r1adLine1);
  list_of_form_input_titles.push('r1adLine1');
  var r1adLine2 = (document.forms["AcornForm"]["r1adLine2"].value);
  list_of_form_input_values.push(r1adLine2);
  list_of_form_input_titles.push('r1adLine2');
  var r1pCode1 = (document.forms["AcornForm"]["r1pCode1"].value);
  list_of_form_input_values.push(r1pCode1);
  list_of_form_input_titles.push('r1pCode1');
  var r1pCode2 = (document.forms["AcornForm"]["r1pCode2"].value);
  list_of_form_input_values.push(r1pCode2);
  list_of_form_input_titles.push('r1pCode2');
  var r1contactNumber = (document.forms["AcornForm"]["r1contactNumber"].value);
  list_of_form_input_values.push(r1contactNumber);
  list_of_form_input_titles.push('r1contactNumber');
  var r1emailAddress = (document.forms["AcornForm"]["r1emailAddress"].value);
  list_of_form_input_values.push(r1emailAddress);
  list_of_form_input_titles.push('r1emailAddress');
  var r2fName = (document.forms["AcornForm"]["r2fName"].value);
  list_of_form_input_values.push(r2fName);
  list_of_form_input_titles.push('r2Firstname');
  var r2lName = (document.forms["AcornForm"]["r2lName"].value);
  list_of_form_input_values.push(r2lName);
  list_of_form_input_titles.push('r2Lastname');
  var r2jobTitle = (document.forms["AcornForm"]["r2jobTitle"].value);
  list_of_form_input_values.push(r2jobTitle);
  list_of_form_input_titles.push('r2jobTitle');
  var r2companyName = (document.forms["AcornForm"]["r2companyName"].value);
  list_of_form_input_values.push(r2companyName);
  list_of_form_input_titles.push('r2companyName');
  var r2adLine1 = (document.forms["AcornForm"]["r2adLine1"].value);
  list_of_form_input_values.push(r2adLine1);
  list_of_form_input_titles.push('r2adLine1');
  var r2adLine2 = (document.forms["AcornForm"]["r2adLine2"].value);
  list_of_form_input_values.push(r2adLine2);
  list_of_form_input_titles.push('r2adLine2');
  var r2pCode1 = (document.forms["AcornForm"]["r2pCode1"].value);
  list_of_form_input_values.push(r2pCode1);
  list_of_form_input_titles.push('r2pCode1');
  var r2pCode2 = (document.forms["AcornForm"]["r2pCode2"].value);
  list_of_form_input_values.push(r2pCode2);
  list_of_form_input_titles.push('r2pCode2');
  var r2contactNumber = (document.forms["AcornForm"]["r2contactNumber"].value);
  list_of_form_input_values.push(r2contactNumber);
  list_of_form_input_titles.push('r2contactNumber');
  var r2emailAddress = (document.forms["AcornForm"]["r2emailAddress"].value);
  list_of_form_input_values.push(r2emailAddress);
  list_of_form_input_titles.push('r2emailAddress');
  var Signature = ""


  //Validation Measure - Empty input checks
  var failure_empty = 0;
  var failure_empty_str = "";
  var signatureNotPresent = isCanvasBlank(document.getElementById('signaturePad'))
  if (signatureNotPresent==true){
    list_of_form_input_values.push(Signature);
    list_of_form_input_titles.push('Signature');
  } else {
    list_of_form_input_values.push("Present");
    list_of_form_input_titles.push('Signature');
  }


  if (title=="empty"){
    failure_empty += 1;
    list_of_failed_input_titles.push(list_of_form_input_titles[0]);
  }
  for (loop_index = 1; loop_index<list_of_form_input_values.length; loop_index++) {
    if (list_of_form_input_values[loop_index].length<1) {
      failure_empty += 1;
      console.log(failure_empty);
      list_of_failed_input_titles.push(list_of_form_input_titles[loop_index]);
    }
  }
  if (failure_empty == list_of_form_input_values.length - 2) { //If form is completely blank - no input from user yet
    pass=false;
    alert("The form is empty. Please fill it in before submitting.");
  } else if ((failure_empty>1) && (failure_empty<list_of_form_input_values.length - 2)) {
    pass = false;
    for (loops = 0; loops<failure_empty; loops++) {
      failure_empty_str = failure_empty_str + list_of_failed_input_titles[loops] + ", ";
    }
    alert(failure_empty_str+"are all missing input.");
  } else if (failure_empty == 1) {
    pass = false;
    alert(list_of_failed_input_titles[0]+" is missing input.");
  }

  var checkbox_and_info_empty_issues = 0;
  var alert_empty_text = "Note:  ";
  if ((companyName.length==0) && (companyType!="")) {
    alert_empty_text = alert_empty_text+"Please give the name of the company,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((eligibleUKDocs1.length==0) && (eligibleUK=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of a document proving your eligibility to work in the UK,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((crimInfo.length==0) && (crimCheck=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of your unspent criminal conviction,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((disInfo.length==0) && (disCheck=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of your disability.";
    checkbox_and_info_empty_issues += 1;
  }
  if (checkbox_and_info_empty_issues>0) {
    pass = false;
    alert(alert_empty_text);
  }



  //Validation Measure - Input contains too many characters/Regex pattern comparison checks
  var checkbox_and_info_issues = 0;
  var alert_text = "Note:  ";
  if (fName.length>20) {
    alert_text = alert_text+"Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (lName.length>20) {
    alert_text = alert_text+"Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1fName.length>20) {
    alert_text = alert_text+"Referee 1 Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1lName.length>20) {
    alert_text = alert_text+"Referee 1 Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2fName.length>20) {
    alert_text = alert_text+"Referee 2 Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2lName.length>20) {
    alert_text = alert_text+"Referee 2 Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1jobTitle.length>30) {
    alert_text = alert_text+"Referee 1 job title is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2jobTitle.length>30) {
    alert_text = alert_text+"Referee 2 job title is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (adLine1.length>30) {
    alert_text = alert_text+"Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (adLine2.length>30) {
    alert_text = alert_text+"Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1adLine1.length>30) {
    alert_text = alert_text+"Referee 1 Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1adLine2.length>30) {
    alert_text = alert_text+"Referee 1 Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2adLine1.length>30) {
    alert_text = alert_text+"Referee 2 Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2adLine2.length>30) {
    alert_text = alert_text+"Referee 2 Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(contactNum) != true) && (contactNum.length!=0)) {
    alert_text = alert_text+"Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(r1contactNumber) != true) && (r1contactNumber.length!=0)) {
    alert_text = alert_text+"Referee 1 Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(r2contactNumber) != true) && (r2contactNumber.length!=0)) {
    alert_text = alert_text+"Referee 2 Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (eContactName.length>20) {
    alert_text = alert_text+"Emergency Contact Name is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(eContactNum) != true) && (eContactNum.length!=0)) {
    alert_text = alert_text+"Emergency Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((quals1.length>25) || (quals2.length>25) || (quals3.length>25)) {
    alert_text = alert_text+"Please ensure your Qualifications values do not exceed 25 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (companyName.length>30) {
    alert_text = alert_text+"Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1companyName.length>30) {
    alert_text = alert_text+"Referee 1 Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2companyName.length>30) {
    alert_text = alert_text+"Referee 2 Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((emailRegex.test(r1emailAddress) != true) && (r1emailAddress.length!=0)) {
    alert_text = alert_text+"Referee 1 email is invalid,"+"\n";
    checkbox_and_info_issues += 1;
  }

  if ((r1emailAddress.length==0) && (checkbox_and_info_issues != 0)){
    alert_text = alert_text+"Please enter an email address for Referee 1,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((emailRegex.test(r2emailAddress) != true) && (r2emailAddress.length!=0)) {
    alert_text = alert_text+"Referee 2 email is invalid,"+"\n";
    checkbox_and_info_issues += 1;
  }

  if ((r2emailAddress.length==0) && (checkbox_and_info_issues != 0)){
    alert_text = alert_text+"Please enter an email address for Referee 2,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((DateValidation(dateOfBirth) == false) && (dateOfBirth1.length!=0) && (dateOfBirth2.length!=0) && (dateOfBirth3.length!=0)){
    alert_empty_text = alert_text+"Date of birth entered is invalid,"+"\n";
    checkbox_and_info_issues += 1;
} else if ((dateOfBirth3 > 2016) || (dateOfBirth3 < 1900) && (dateOfBirth1.length!=0) && (dateOfBirth2.length!=0) && (dateOfBirth3.length!=0)) {
    alert_emtpy_text = alert_text+"Date of birth entered is invalid,"+"\n";
    checkbox_and_info_issues += 1;

} else if ((DoBRegex.test(dateOfBirth3) != true) && (dateOfBirth1.length!=0) && (dateOfBirth2.length!=0) && (dateOfBirth3.length!=0)) {
    alert_emtpy_text = alert_text+"Date of birth entered is invalid,"+"\n";
    checkbox_and_info_issues += 1;

}

  if ((checkbox_and_info_issues>0) && (failure_empty != list_of_form_input_values.length - 2) && (alert_text != "")) {
    pass = false;
    alert(alert_text);
  }
  return pass;

}

function validateUserForm() {
  var pass = true;
  var list_of_form_input_values = [];
  var list_of_form_input_titles= [];
  var list_of_failed_input_titles = []; //for inputs which are empty
  var ninRegex = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z][0-9][0-9][0-9][0-9][0-9][0-9][A-DFM]$/;
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var numberRegex = /^0\d{10}$/;
  var DoBRegex = /^[0-9]+$/;
  //Gathering user input from AcornFormPart1 - accessing the DOM.
  //section 1

  var title = (document.forms["AcornForm"]["title"].value);
  list_of_form_input_values.push(title);
  list_of_form_input_titles.push('Title');
  var fName = (document.forms["AcornForm"]["fName"].value);
  list_of_form_input_values.push(fName);
  list_of_form_input_titles.push('Firstname');
  var lName = (document.forms["AcornForm"]["lName"].value);
  list_of_form_input_values.push(lName);
  list_of_form_input_titles.push('Lastname');
  var dateOfBirth1 = (document.forms["AcornForm"]["dateOfBirth1"].value);
  var dateOfBirth2 = (document.forms["AcornForm"]["dateOfBirth2"].value);
  var dateOfBirth3 = (document.forms["AcornForm"]["dateOfBirth3"].value);
  var dateOfBirth = dateOfBirth1+"/"+dateOfBirth2+"/"+dateOfBirth3
  list_of_form_input_values.push(dateOfBirth);
  list_of_form_input_titles.push('Date of Birth');
  var natInsNum1 = (document.forms["AcornForm"]["natInNum1"].value);
  var natInsNum2 = (document.forms["AcornForm"]["natInNum2"].value);
  var natInsNum3 = (document.forms["AcornForm"]["natInNum3"].value);
  var natInsNum4 = (document.forms["AcornForm"]["natInNum4"].value);
  var natInsNum5 = (document.forms["AcornForm"]["natInNum5"].value);
  var natInsNum = natInsNum1+" "+natInsNum2+" "+natInsNum3+" "+natInsNum4+" "+natInsNum5
  list_of_form_input_values.push(natInsNum);
  list_of_form_input_titles.push('National Insurance Number');
  var adLine1 = (document.forms["AcornForm"]["adLine1"].value);
  list_of_form_input_values.push(adLine1);
  list_of_form_input_titles.push('Address Line 1');
  var adLine2 = (document.forms["AcornForm"]["adLine2"].value);
  list_of_form_input_values.push(adLine2);
  list_of_form_input_titles.push('Address Line 2');
  var pCode1 = (document.forms["AcornForm"]["pCode1"].value);
  list_of_form_input_values.push(pCode1);
  list_of_form_input_titles.push('PostCode Box 1');
  var pCode2 = (document.forms["AcornForm"]["pCode2"].value);
  list_of_form_input_values.push(pCode2);
  list_of_form_input_titles.push('PostCode Box 2');
  var contactNum = (document.forms["AcornForm"]["contactNum"].value);
  list_of_form_input_values.push(contactNum);
  list_of_form_input_titles.push('Contact Number');
  var eContactName = (document.forms["AcornForm"]["eContactName"].value);
  list_of_form_input_values.push(eContactName);
  list_of_form_input_titles.push('Emergency Contact Name');
  var eContactNum = (document.forms["AcornForm"]["eContactNum"].value);
  list_of_form_input_values.push(eContactNum);
  list_of_form_input_titles.push('Emergency Contact Number');
  var quals1 = (document.forms["AcornForm"]["quals1"].value);
  list_of_form_input_values.push(quals1);
  list_of_form_input_titles.push('Qualification 1');
  var quals2 = (document.forms["AcornForm"]["quals2"].value);
  list_of_form_input_values.push(quals2);
  list_of_form_input_titles.push('Qualification 2');
  var quals3 = (document.forms["AcornForm"]["quals3"].value);
  list_of_form_input_values.push(quals3);
  list_of_form_input_titles.push('Qualification 3');
  var companyType = (document.forms["AcornForm"]["companyType"].value); //radioInput, only one checkbox can be ticked - value could be; umbrellaCompany, personalServices, or empty ""
  list_of_form_input_values.push(companyType);
  list_of_form_input_titles.push('Company Type');
  var companyName = (document.forms["AcornForm"]["companyName"].value);

  //section 2
  var eligibleUK = (document.forms["AcornForm"]["eligibleUK"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(eligibleUK);
  list_of_form_input_titles.push('Are You Eligible to Work in the UK?');
  var eligibleUKDocs1 = (document.forms["AcornForm"]["eligibleUKDocs1"].value);
  var eligibleUKDocs2 = (document.forms["AcornForm"]["eligibleUKDocs2"].value);
  //No check - at least 1 document needs to be detailed.
  var eligibleUKDocs3 = (document.forms["AcornForm"]["eligibleUKDocs3"].value);
  //No check - at least 1 document needs to be detailed.
  var ukDrive = (document.forms["AcornForm"]["ukDrive"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(ukDrive);
  list_of_form_input_titles.push('Do You Hold a Current UK Driving Licence?');
  var crimCheck = (document.forms["AcornForm"]["crimCheck"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(crimCheck);
  list_of_form_input_titles.push('Any Unspent Criminal Convictions?');
  var crimInfo = (document.forms["AcornForm"]["crimInfo"].value);
  var disCheck = (document.forms["AcornForm"]["disCheck"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(disCheck);
  list_of_form_input_titles.push('Disability');
  var disInfo = (document.forms["AcornForm"]["disInfo"].value);
  //var submitDate = new Date()

  //section 3
  var r1fName = (document.forms["AcornForm"]["r1fName"].value);
  list_of_form_input_values.push(r1fName);
  list_of_form_input_titles.push('r1Firstname');
  var r1lName = (document.forms["AcornForm"]["r1lName"].value);
  list_of_form_input_values.push(r1lName);
  list_of_form_input_titles.push('r1Lastname');
  var r1jobTitle = (document.forms["AcornForm"]["r1jobTitle"].value);
  list_of_form_input_values.push(r1jobTitle);
  list_of_form_input_titles.push('r1jobTitle');
  var r1companyName = (document.forms["AcornForm"]["r1companyName"].value);
  list_of_form_input_values.push(r1companyName);
  list_of_form_input_titles.push('r1companyName');
  var r1adLine1 = (document.forms["AcornForm"]["r1adLine1"].value);
  list_of_form_input_values.push(r1adLine1);
  list_of_form_input_titles.push('r1adLine1');
  var r1adLine2 = (document.forms["AcornForm"]["r1adLine2"].value);
  list_of_form_input_values.push(r1adLine2);
  list_of_form_input_titles.push('r1adLine2');
  var r1pCode1 = (document.forms["AcornForm"]["r1pCode1"].value);
  list_of_form_input_values.push(r1pCode1);
  list_of_form_input_titles.push('r1pCode1');
  var r1pCode2 = (document.forms["AcornForm"]["r1pCode2"].value);
  list_of_form_input_values.push(r1pCode2);
  list_of_form_input_titles.push('r1pCode2');
  var r1contactNumber = (document.forms["AcornForm"]["r1contactNumber"].value);
  list_of_form_input_values.push(r1contactNumber);
  list_of_form_input_titles.push('r1contactNumber');
  var r1emailAddress = (document.forms["AcornForm"]["r1emailAddress"].value);
  list_of_form_input_values.push(r1emailAddress);
  list_of_form_input_titles.push('r1emailAddress');
  var r2fName = (document.forms["AcornForm"]["r2fName"].value);
  list_of_form_input_values.push(r2fName);
  list_of_form_input_titles.push('r2Firstname');
  var r2lName = (document.forms["AcornForm"]["r2lName"].value);
  list_of_form_input_values.push(r2lName);
  list_of_form_input_titles.push('r2Lastname');
  var r2jobTitle = (document.forms["AcornForm"]["r2jobTitle"].value);
  list_of_form_input_values.push(r2jobTitle);
  list_of_form_input_titles.push('r2jobTitle');
  var r2companyName = (document.forms["AcornForm"]["r2companyName"].value);
  list_of_form_input_values.push(r2companyName);
  list_of_form_input_titles.push('r2companyName');
  var r2adLine1 = (document.forms["AcornForm"]["r2adLine1"].value);
  list_of_form_input_values.push(r2adLine1);
  list_of_form_input_titles.push('r2adLine1');
  var r2adLine2 = (document.forms["AcornForm"]["r2adLine2"].value);
  list_of_form_input_values.push(r2adLine2);
  list_of_form_input_titles.push('r2adLine2');
  var r2pCode1 = (document.forms["AcornForm"]["r2pCode1"].value);
  list_of_form_input_values.push(r2pCode1);
  list_of_form_input_titles.push('r2pCode1');
  var r2pCode2 = (document.forms["AcornForm"]["r2pCode2"].value);
  list_of_form_input_values.push(r2pCode2);
  list_of_form_input_titles.push('r2pCode2');
  var r2contactNumber = (document.forms["AcornForm"]["r2contactNumber"].value);
  list_of_form_input_values.push(r2contactNumber);
  list_of_form_input_titles.push('r2contactNumber');
  var r2emailAddress = (document.forms["AcornForm"]["r2emailAddress"].value);
  list_of_form_input_values.push(r2emailAddress);
  list_of_form_input_titles.push('r2emailAddress');
  var Signature = ""
  list_of_form_input_values.push();
  list_of_form_input_titles.push('Signature');

  //Validation Measure - Empty input checks
  var failure_empty = 0;
  var failure_empty_str = "";

  if (title=="empty"){
    failure_empty += 1;
    list_of_failed_input_titles.push(list_of_form_input_titles[0]);
  }
  for (loop_index = 1; loop_index<list_of_form_input_values.length; loop_index++) {
    if (list_of_form_input_values[loop_index].length<1) {
      failure_empty += 1;
      console.log(failure_empty);
      list_of_failed_input_titles.push(list_of_form_input_titles[loop_index]);
    }
  }
  if (failure_empty == list_of_form_input_values.length - 2) { //If form is completely blank - no input from user yet
    pass=false;
    alert("The form is empty. Please fill it in before submitting.");
  } else if ((failure_empty>1) && (failure_empty<list_of_form_input_values.length - 1)) {
    pass = false;
    for (loops = 0; loops<failure_empty; loops++) {
      failure_empty_str = failure_empty_str + list_of_failed_input_titles[loops] + ", ";
    }
    alert(failure_empty_str+"are all missing input.");
  } else if (failure_empty == 1) {
    pass = false;
    alert(list_of_failed_input_titles[0]+" is missing input.");
  }

  var checkbox_and_info_empty_issues = 0;
  var alert_empty_text = "Note:  ";
  if ((companyName.length==0) && (companyType!="")) {
    alert_empty_text = alert_empty_text+"Please give the name of the company,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((eligibleUKDocs1.length==0) && (eligibleUK=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of a document proving your eligibility to work in the UK,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((crimInfo.length==0) && (crimCheck=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of your unspent criminal conviction,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((disInfo.length==0) && (disCheck=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of your disability.";
    checkbox_and_info_empty_issues += 1;
  }
  if (checkbox_and_info_empty_issues>0) {
    pass = false;
    alert(alert_empty_text);
  }



  //Validation Measure - Input contains too many characters/Regex pattern comparison checks
  var checkbox_and_info_issues = 0;
  var alert_text = "Note:  ";
  if (fName.length>20) {
    alert_text = alert_text+"Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (lName.length>20) {
    alert_text = alert_text+"Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1fName.length>20) {
    alert_text = alert_text+"Referee 1 Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1lName.length>20) {
    alert_text = alert_text+"Referee 1 Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2fName.length>20) {
    alert_text = alert_text+"Referee 2 Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2lName.length>20) {
    alert_text = alert_text+"Referee 2 Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1jobTitle.length>30) {
    alert_text = alert_text+"Referee 1 job title is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2jobTitle.length>30) {
    alert_text = alert_text+"Referee 2 job title is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (adLine1.length>30) {
    alert_text = alert_text+"Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (adLine2.length>30) {
    alert_text = alert_text+"Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1adLine1.length>30) {
    alert_text = alert_text+"Referee 1 Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1adLine2.length>30) {
    alert_text = alert_text+"Referee 1 Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2adLine1.length>30) {
    alert_text = alert_text+"Referee 2 Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2adLine2.length>30) {
    alert_text = alert_text+"Referee 2 Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(contactNum) != true) && (contactNum.length!=0)) {
    alert_text = alert_text+"Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(r1contactNumber) != true) && (r1contactNumber.length!=0)) {
    alert_text = alert_text+"Referee 1 Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(r2contactNumber) != true) && (r2contactNumber.length!=0)) {
    alert_text = alert_text+"Referee 2 Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (eContactName.length>20) {
    alert_text = alert_text+"Emergency Contact Name is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(eContactNum) != true) && (eContactNum.length!=0)) {
    alert_text = alert_text+"Emergency Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((quals1.length>25) || (quals2.length>25) || (quals3.length>25)) {
    alert_text = alert_text+"Please ensure your Qualifications values do not exceed 25 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (companyName.length>30) {
    alert_text = alert_text+"Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1companyName.length>30) {
    alert_text = alert_text+"Referee 1 Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2companyName.length>30) {
    alert_text = alert_text+"Referee 2 Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((emailRegex.test(r1emailAddress) != true) && (r1emailAddress.length!=0)) {
    alert_text = alert_text+"Referee 1 email is invalid,"+"\n";
    checkbox_and_info_issues += 1;
  }

  if ((r1emailAddress.length==0) && (checkbox_and_info_issues != 0)){
    alert_text = alert_text+"Please enter an email address for Referee 1,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((emailRegex.test(r2emailAddress) != true) && (r2emailAddress.length!=0)) {
    alert_text = alert_text+"Referee 2 email is invalid,"+"\n";
    checkbox_and_info_issues += 1;
  }

  if ((r2emailAddress.length==0) && (checkbox_and_info_issues != 0)){
    alert_text = alert_text+"Please enter an email address for Referee 2,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((DateValidation(dateOfBirth) == false) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)){
  alert_empty_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;
} else if ((dateOfBirth3 > 2016) || (dateOfBirth3 < 1900) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)) {
  alert_emtpy_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;
} else if ((DoBRegex.test(dateOfBirth3) != true) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)) {
  alert_emtpy_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;
}
  if ((checkbox_and_info_issues>0) && failure_empty != list_of_form_input_values.length - 2) {
    pass = false;
    alert(alert_text);
  }
  return pass;
}

function validateSignUp() {
  var pass = true;
  var list_of_form_input_values = [];
  var list_of_form_input_titles= [];
  var list_of_failed_input_titles = []; //for inputs which are empty
  var ninRegex = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z][0-9][0-9][0-9][0-9][0-9][0-9][A-DFM]$/;
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var numberRegex = /^0\d{10}$/;
  var DoBRegex = /^[0-9]+$/;

  //Gathering user input from signUpFormPart1 - accessing the DOM.
  //section 1
  var title = (document.forms["signUpForm"]["title"].value);
  list_of_form_input_values.push(title);
  list_of_form_input_titles.push('Title');
  var fName = (document.forms["signUpForm"]["fName"].value);
  list_of_form_input_values.push(fName);
  list_of_form_input_titles.push('Firstname');
  var lName = (document.forms["signUpForm"]["lName"].value);
  list_of_form_input_values.push(lName);
  list_of_form_input_titles.push('Lastname');
  var dateOfBirth1 = (document.forms["signUpForm"]["dateOfBirth1"].value);
  var dateOfBirth2 = (document.forms["signUpForm"]["dateOfBirth2"].value);
  var dateOfBirth3 = (document.forms["signUpForm"]["dateOfBirth3"].value);
  var dateOfBirth = dateOfBirth1+"/"+dateOfBirth2+"/"+dateOfBirth3
  list_of_form_input_values.push(dateOfBirth);
  list_of_form_input_titles.push('Date of Birth');
  var natInsNum1 = (document.forms["signUpForm"]["natInNum1"].value);
  var natInsNum2 = (document.forms["signUpForm"]["natInNum2"].value);
  var natInsNum3 = (document.forms["signUpForm"]["natInNum3"].value);
  var natInsNum4 = (document.forms["signUpForm"]["natInNum4"].value);
  var natInsNum5 = (document.forms["signUpForm"]["natInNum5"].value);
  var natInsNum = natInsNum1+" "+natInsNum2+" "+natInsNum3+" "+natInsNum4+" "+natInsNum5
  list_of_form_input_values.push(natInsNum);
  list_of_form_input_titles.push('National Insurance Number');
  var adLine1 = (document.forms["signUpForm"]["adLine1"].value);
  list_of_form_input_values.push(adLine1);
  list_of_form_input_titles.push('Address Line 1');
  var adLine2 = (document.forms["signUpForm"]["adLine2"].value);
  list_of_form_input_values.push(adLine2);
  list_of_form_input_titles.push('Address Line 2');
  var pCode1 = (document.forms["signUpForm"]["pCode1"].value);
  list_of_form_input_values.push(pCode1);
  list_of_form_input_titles.push('PostCode Box 1');
  var pCode2 = (document.forms["signUpForm"]["pCode2"].value);
  list_of_form_input_values.push(pCode2);
  list_of_form_input_titles.push('PostCode Box 2');
  var contactNumber = (document.forms["signUpForm"]["contactNumber"].value);
  list_of_form_input_values.push(contactNumber);
  list_of_form_input_titles.push('Contact Number');
  var eContactName = (document.forms["signUpForm"]["eContactName"].value);
  list_of_form_input_values.push(eContactName);
  list_of_form_input_titles.push('Emergency Contact Name');
  var eContactNumber = (document.forms["signUpForm"]["eContactNumber"].value);
  list_of_form_input_values.push(eContactNumber);
  list_of_form_input_titles.push('Emergency Contact Number');
  var quals1 = (document.forms["signUpForm"]["quals1"].value);
  list_of_form_input_values.push(quals1);
  list_of_form_input_titles.push('Qualification 1');
  var quals2 = (document.forms["signUpForm"]["quals2"].value);
  list_of_form_input_values.push(quals2);
  list_of_form_input_titles.push('Qualification 2');
  var quals3 = (document.forms["signUpForm"]["quals3"].value);
  list_of_form_input_values.push(quals3);
  list_of_form_input_titles.push('Qualification 3');
  var companyType = (document.forms["signUpForm"]["companyType"].value); //radioInput, only one checkbox can be ticked - value could be; umbrellaCompany, personalServices, or empty ""
  list_of_form_input_values.push(companyType);
  list_of_form_input_titles.push('Company Type');
  var companyName = (document.forms["signUpForm"]["companyName"].value);

  //section 2
  var eligibleUK = (document.forms["signUpForm"]["eligibleUK"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(eligibleUK);
  list_of_form_input_titles.push('Are You Eligible to Work in the UK?');
  var eligibleUKDocs1 = (document.forms["signUpForm"]["eligibleUKDocs1"].value);
  var eligibleUKDocs2 = (document.forms["signUpForm"]["eligibleUKDocs2"].value);
  //No check - at least 1 document needs to be detailed.
  var eligibleUKDocs3 = (document.forms["signUpForm"]["eligibleUKDocs3"].value);
  //No check - at least 1 document needs to be detailed.
  var ukDrive = (document.forms["signUpForm"]["ukDrive"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(ukDrive);
  list_of_form_input_titles.push('Do You Hold a Current UK Driving Licence?');
  var crimCheck = (document.forms["signUpForm"]["crimCheck"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(crimCheck);
  list_of_form_input_titles.push('Any Unspent Criminal Convictions?');
  var crimInfo = (document.forms["signUpForm"]["crimInfo"].value);
  var disCheck = (document.forms["signUpForm"]["disCheck"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(disCheck);
  list_of_form_input_titles.push('Disability');
  var disInfo = (document.forms["signUpForm"]["disInfo"].value);
  var uEmail = (document.forms["signUpForm"]["uEmail"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_titles.push('Email')
  list_of_form_input_values.push(uEmail)
  var uPassword = (document.forms["signUpForm"]["uPassword"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_titles.push('Password');
  list_of_form_input_values.push(uPassword);
  //section 3


  //Validation Measure - Empty input checks
  var failure_empty = 0;
  var failure_empty_str = "";
  if (title=="empty"){
    failure_empty += 1;
    list_of_failed_input_titles.push(list_of_form_input_titles[0]);
  }
  for (loop_index = 1; loop_index<list_of_form_input_values.length; loop_index++) {
    if (list_of_form_input_values[loop_index].length<1) {
      failure_empty += 1;
      list_of_failed_input_titles.push(list_of_form_input_titles[loop_index]);
    }
  }

  if (failure_empty == list_of_form_input_values.length - 2) { //If form is completely blank - no input from user yet
    pass=false;
    alert("The form is empty. Please fill it in before submitting.");
  } else if ((failure_empty>1) && (failure_empty<20)) {
    pass = false;
    for (loops = 0; loops<failure_empty; loops++) {
      failure_empty_str = failure_empty_str + list_of_failed_input_titles[loops] + ", ";
    }
    alert(failure_empty_str+"are all missing input.");
  } else if (failure_empty == 1) {
    pass = false;
    alert(list_of_failed_input_titles[0]+" is missing input.");
  }

  var checkbox_and_info_empty_issues = 0;
  var alert_empty_text = "Note:  ";
  if ((companyName.length==0) && (companyType!="")) {
    alert_empty_text = alert_empty_text+"Please give the name of the company,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((eligibleUKDocs1.length==0) && (eligibleUK=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of a document proving your eligibility to work in the UK,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((crimInfo.length==0) && (crimCheck=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of your unspent criminal conviction,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((disInfo.length==0) && (disCheck=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of your disability.";
    checkbox_and_info_empty_issues += 1;
  }
  if (checkbox_and_info_empty_issues>0) {
    pass = false;
    alert(alert_empty_text);
  }

  //Validation Measure - Input contains too many characters/Regex pattern comparison checks
  var checkbox_and_info_issues = 0;
  var alert_text = "Note:  ";
  if (fName.length>20) {
    alert_text = alert_text+"Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (lName.length>20) {
    alert_text = alert_text+"Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (adLine1.length>30) {
    alert_text = alert_text+"Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (adLine2.length>30) {
    alert_text = alert_text+"Address Line 2 is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(contactNumber) != true) && (contactNumber.length!=0)) {
    alert_text = alert_text+"Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((DateValidation(dateOfBirth) == false) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)){
  alert_empty_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;
} else if ((dateOfBirth3 > 2016) || (dateOfBirth3 < 1900) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)) {
  alert_emtpy_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;
} else if ((DoBRegex.test(dateOfBirth3) != true) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)) {
  alert_emtpy_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;

  if (eContactName.length>20) {
    alert_text = alert_text+"Emergency Contact Name is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(eContactNumber) != true) && (eContactNumber.length!=0)) {
    alert_text = alert_text+"Emergency Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((quals1.length>25) || (quals2.length>25) || (quals3.length>25)) {
    alert_text = alert_text+"Please ensure your Qualifications values do not exceed 25 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (companyName.length>30) {
    alert_text = alert_text+"Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }

  if ((emailRegex.test(uEmail) != true) && (uEmail.length!=0) && (checkbox_and_info_issues != 0)) {
    alert_text = alert_text+"Entered email is invalid,"+"\n";
    checkbox_and_info_issues += 1;
  }

  if ((checkbox_and_info_issues>0) && failure_empty != (list_of_form_input_values.length - 2)) {
    pass = false;
    alert(alert_text);
  }
  return pass;
}
}

function DateValidation(check) {
  var SplitDate = check.split('/');
  var y = SplitDate[2],
    m = SplitDate[1],
    d = SplitDate[0];
  var MonthLimits = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if ((!(y % 4) && y % 100) || !(y % 400)) {
    MonthLimits[1] = 29;
  }
  return !(/\D/.test(String(d))) && d > 0 && d <= MonthLimits[--m]
}

function isCanvasBlank(canvas) {
    var blank = document.createElement('canvas');
    blank.width = canvas.width;
    blank.height = canvas.height;

    return canvas.toDataURL() == blank.toDataURL();
}


function LoginValidation() {
      var pass = true;
      var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


      var uEmail = (document.forms["loginForm"]["uEmail"].value);
      var uPassword = (document.forms["loginForm"]["uPassword"].value);


      if ((uEmail.length == 0) || (uPassword.length == 0)){
        alert("Please enter your login email and password.")
        pass == false
      } else if (emailRegex.test(uEmail) != true) {
        alert("Please enter a valid email address.")
        pass == false
      }
      return pass;
}


function AdminValidation() {
      var pass = true;
      var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


      var uEmailA = (document.forms["AdminForm"]["uEmailA"].value);
      var uPasswordA = (document.forms["AdminForm"]["uPasswordA"].value);


      if ((uEmailA.length == 0) || (uPasswordA.length == 0)){
        alert("Please enter your login email and password.")
        pass == false
      } else if (emailRegex.test(uEmailA) != true) {
        alert("Please enter a valid email address.")
        pass == false
      }
      return pass;
}

function validateJobForm() {
  var pass = true;
  var list_of_form_input_values = [];
  var list_of_form_input_titles= [];
  var list_of_failed_input_titles = []; //for inputs which are empty
  var ninRegex = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z][0-9][0-9][0-9][0-9][0-9][0-9][A-DFM]$/;
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var numberRegex = /^0\d{10}$/;
  var DoBRegex = /^[0-9]+$/;
  //Gathering user input from AcornFormPart1 - accessing the DOM.
  //section 1

  var title = (document.forms["AcornForm"]["title"].value);
  list_of_form_input_values.push(title);
  list_of_form_input_titles.push('Title');
  var fName = (document.forms["AcornForm"]["fName"].value);
  list_of_form_input_values.push(fName);
  list_of_form_input_titles.push('Firstname');
  var lName = (document.forms["AcornForm"]["lName"].value);
  list_of_form_input_values.push(lName);
  list_of_form_input_titles.push('Lastname');
  var dateOfBirth1 = (document.forms["AcornForm"]["dateOfBirth1"].value);
  var dateOfBirth2 = (document.forms["AcornForm"]["dateOfBirth2"].value);
  var dateOfBirth3 = (document.forms["AcornForm"]["dateOfBirth3"].value);
  var dateOfBirth = dateOfBirth1+"/"+dateOfBirth2+"/"+dateOfBirth3
  list_of_form_input_values.push(dateOfBirth);
  list_of_form_input_titles.push('Date of Birth');
  var natInsNum1 = (document.forms["AcornForm"]["natInNum1"].value);
  var natInsNum2 = (document.forms["AcornForm"]["natInNum2"].value);
  var natInsNum3 = (document.forms["AcornForm"]["natInNum3"].value);
  var natInsNum4 = (document.forms["AcornForm"]["natInNum4"].value);
  var natInsNum5 = (document.forms["AcornForm"]["natInNum5"].value);
  var natInsNum = natInsNum1+" "+natInsNum2+" "+natInsNum3+" "+natInsNum4+" "+natInsNum5
  list_of_form_input_values.push(natInsNum);
  list_of_form_input_titles.push('National Insurance Number');
  var adLine1 = (document.forms["AcornForm"]["adLine1"].value);
  list_of_form_input_values.push(adLine1);
  list_of_form_input_titles.push('Address Line 1');
  var adLine2 = (document.forms["AcornForm"]["adLine2"].value);
  list_of_form_input_values.push(adLine2);
  list_of_form_input_titles.push('Address Line 2');
  var pCode1 = (document.forms["AcornForm"]["pCode1"].value);
  list_of_form_input_values.push(pCode1);
  list_of_form_input_titles.push('PostCode Box 1');
  var pCode2 = (document.forms["AcornForm"]["pCode2"].value);
  list_of_form_input_values.push(pCode2);
  list_of_form_input_titles.push('PostCode Box 2');
  var contactNum = (document.forms["AcornForm"]["contactNum"].value);
  list_of_form_input_values.push(contactNum);
  list_of_form_input_titles.push('Contact Number');
  var eContactName = (document.forms["AcornForm"]["eContactName"].value);
  list_of_form_input_values.push(eContactName);
  list_of_form_input_titles.push('Emergency Contact Name');
  var eContactNum = (document.forms["AcornForm"]["eContactNum"].value);
  list_of_form_input_values.push(eContactNum);
  list_of_form_input_titles.push('Emergency Contact Number');
  var quals1 = (document.forms["AcornForm"]["quals1"].value);
  list_of_form_input_values.push(quals1);
  list_of_form_input_titles.push('Qualification 1');
  var quals2 = (document.forms["AcornForm"]["quals2"].value);
  list_of_form_input_values.push(quals2);
  list_of_form_input_titles.push('Qualification 2');
  var quals3 = (document.forms["AcornForm"]["quals3"].value);
  list_of_form_input_values.push(quals3);
  list_of_form_input_titles.push('Qualification 3');
  var companyType = (document.forms["AcornForm"]["companyType"].value); //radioInput, only one checkbox can be ticked - value could be; umbrellaCompany, personalServices, or empty ""
  list_of_form_input_values.push(companyType);
  list_of_form_input_titles.push('Company Type');
  var companyName = (document.forms["AcornForm"]["companyName"].value);

  //section 2
  var eligibleUK = (document.forms["AcornForm"]["eligibleUK"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(eligibleUK);
  list_of_form_input_titles.push('Are You Eligible to Work in the UK?');
  var eligibleUKDocs1 = (document.forms["AcornForm"]["eligibleUKDocs1"].value);
  var eligibleUKDocs2 = (document.forms["AcornForm"]["eligibleUKDocs2"].value);
  //No check - at least 1 document needs to be detailed.
  var eligibleUKDocs3 = (document.forms["AcornForm"]["eligibleUKDocs3"].value);
  //No check - at least 1 document needs to be detailed.
  var ukDrive = (document.forms["AcornForm"]["ukDrive"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(ukDrive);
  list_of_form_input_titles.push('Do You Hold a Current UK Driving Licence?');
  var crimCheck = (document.forms["AcornForm"]["crimCheck"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(crimCheck);
  list_of_form_input_titles.push('Any Unspent Criminal Convictions?');
  var crimInfo = (document.forms["AcornForm"]["crimInfo"].value);
  var disCheck = (document.forms["AcornForm"]["disCheck"].value); //radioInput, only one checkbox can be ticked - value could be; yes, no or empty ""
  list_of_form_input_values.push(disCheck);
  list_of_form_input_titles.push('Disability');
  var disInfo = (document.forms["AcornForm"]["disInfo"].value);
  //var submitDate = new Date()

  //section 3
  var r1fName = (document.forms["AcornForm"]["r1fName"].value);
  list_of_form_input_values.push(r1fName);
  list_of_form_input_titles.push('r1Firstname');
  var r1lName = (document.forms["AcornForm"]["r1lName"].value);
  list_of_form_input_values.push(r1lName);
  list_of_form_input_titles.push('r1Lastname');
  var r1jobTitle = (document.forms["AcornForm"]["r1jobTitle"].value);
  list_of_form_input_values.push(r1jobTitle);
  list_of_form_input_titles.push('r1jobTitle');
  var r1companyName = (document.forms["AcornForm"]["r1companyName"].value);
  list_of_form_input_values.push(r1companyName);
  list_of_form_input_titles.push('r1companyName');
  var r1adLine1 = (document.forms["AcornForm"]["r1adLine1"].value);
  list_of_form_input_values.push(r1adLine1);
  list_of_form_input_titles.push('r1adLine1');
  var r1adLine2 = (document.forms["AcornForm"]["r1adLine2"].value);
  list_of_form_input_values.push(r1adLine2);
  list_of_form_input_titles.push('r1adLine2');
  var r1pCode1 = (document.forms["AcornForm"]["r1pCode1"].value);
  list_of_form_input_values.push(r1pCode1);
  list_of_form_input_titles.push('r1pCode1');
  var r1pCode2 = (document.forms["AcornForm"]["r1pCode2"].value);
  list_of_form_input_values.push(r1pCode2);
  list_of_form_input_titles.push('r1pCode2');
  var r1contactNumber = (document.forms["AcornForm"]["r1contactNumber"].value);
  list_of_form_input_values.push(r1contactNumber);
  list_of_form_input_titles.push('r1contactNumber');
  var r1emailAddress = (document.forms["AcornForm"]["r1emailAddress"].value);
  list_of_form_input_values.push(r1emailAddress);
  list_of_form_input_titles.push('r1emailAddress');
  var r2fName = (document.forms["AcornForm"]["r2fName"].value);
  list_of_form_input_values.push(r2fName);
  list_of_form_input_titles.push('r2Firstname');
  var r2lName = (document.forms["AcornForm"]["r2lName"].value);
  list_of_form_input_values.push(r2lName);
  list_of_form_input_titles.push('r2Lastname');
  var r2jobTitle = (document.forms["AcornForm"]["r2jobTitle"].value);
  list_of_form_input_values.push(r2jobTitle);
  list_of_form_input_titles.push('r2jobTitle');
  var r2companyName = (document.forms["AcornForm"]["r2companyName"].value);
  list_of_form_input_values.push(r2companyName);
  list_of_form_input_titles.push('r2companyName');
  var r2adLine1 = (document.forms["AcornForm"]["r2adLine1"].value);
  list_of_form_input_values.push(r2adLine1);
  list_of_form_input_titles.push('r2adLine1');
  var r2adLine2 = (document.forms["AcornForm"]["r2adLine2"].value);
  list_of_form_input_values.push(r2adLine2);
  list_of_form_input_titles.push('r2adLine2');
  var r2pCode1 = (document.forms["AcornForm"]["r2pCode1"].value);
  list_of_form_input_values.push(r2pCode1);
  list_of_form_input_titles.push('r2pCode1');
  var r2pCode2 = (document.forms["AcornForm"]["r2pCode2"].value);
  list_of_form_input_values.push(r2pCode2);
  list_of_form_input_titles.push('r2pCode2');
  var r2contactNumber = (document.forms["AcornForm"]["r2contactNumber"].value);
  list_of_form_input_values.push(r2contactNumber);
  list_of_form_input_titles.push('r2contactNumber');
  var r2emailAddress = (document.forms["AcornForm"]["r2emailAddress"].value);
  list_of_form_input_values.push(r2emailAddress);
  list_of_form_input_titles.push('r2emailAddress');
  var Signature = ""
  list_of_form_input_values.push();
  list_of_form_input_titles.push('Signature');

  //Validation Measure - Empty input checks
  var failure_empty = 0;
  var failure_empty_str = "";

  if (title=="empty"){
    failure_empty += 1;
    list_of_failed_input_titles.push(list_of_form_input_titles[0]);
  }
  for (loop_index = 1; loop_index<list_of_form_input_values.length; loop_index++) {
    if (list_of_form_input_values[loop_index].length<1) {
      failure_empty += 1;
      console.log(failure_empty);
      list_of_failed_input_titles.push(list_of_form_input_titles[loop_index]);
    }
  }
  if (failure_empty == list_of_form_input_values.length - 2) { //If form is completely blank - no input from user yet
    pass=false;
    alert("The form is empty. Please fill it in before submitting.");
  } else if ((failure_empty>1) && (failure_empty<list_of_form_input_values.length - 1)) {
    pass = false;
    for (loops = 0; loops<failure_empty; loops++) {
      failure_empty_str = failure_empty_str + list_of_failed_input_titles[loops] + ", ";
    }
    alert(failure_empty_str+"are all missing input.");
  } else if (failure_empty == 1) {
    pass = false;
    alert(list_of_failed_input_titles[0]+" is missing input.");
  }

  var checkbox_and_info_empty_issues = 0;
  var alert_empty_text = "Note:  ";
  if ((companyName.length==0) && (companyType!="")) {
    alert_empty_text = alert_empty_text+"Please give the name of the company,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((eligibleUKDocs1.length==0) && (eligibleUK=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of a document proving your eligibility to work in the UK,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((crimInfo.length==0) && (crimCheck=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of your unspent criminal conviction,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((disInfo.length==0) && (disCheck=="yes")) {
    alert_empty_text = alert_empty_text+"Please give details of your disability.";
    checkbox_and_info_empty_issues += 1;
  }
  if (checkbox_and_info_empty_issues>0) {
    pass = false;
    alert(alert_empty_text);
  }



  //Validation Measure - Input contains too many characters/Regex pattern comparison checks
  var checkbox_and_info_issues = 0;
  var alert_text = "Note:  ";
  if (fName.length>20) {
    alert_text = alert_text+"Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (lName.length>20) {
    alert_text = alert_text+"Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1fName.length>20) {
    alert_text = alert_text+"Referee 1 Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1lName.length>20) {
    alert_text = alert_text+"Referee 1 Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2fName.length>20) {
    alert_text = alert_text+"Referee 2 Firstname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2lName.length>20) {
    alert_text = alert_text+"Referee 2 Lastname is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1jobTitle.length>30) {
    alert_text = alert_text+"Referee 1 job title is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2jobTitle.length>30) {
    alert_text = alert_text+"Referee 2 job title is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (adLine1.length>30) {
    alert_text = alert_text+"Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (adLine2.length>30) {
    alert_text = alert_text+"Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1adLine1.length>30) {
    alert_text = alert_text+"Referee 1 Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1adLine2.length>30) {
    alert_text = alert_text+"Referee 1 Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2adLine1.length>30) {
    alert_text = alert_text+"Referee 2 Address Line 1 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2adLine2.length>30) {
    alert_text = alert_text+"Referee 2 Address Line 2 is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(contactNum) != true) && (contactNum.length!=0)) {
    alert_text = alert_text+"Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(r1contactNumber) != true) && (r1contactNumber.length!=0)) {
    alert_text = alert_text+"Referee 1 Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(r2contactNumber) != true) && (r2contactNumber.length!=0)) {
    alert_text = alert_text+"Referee 2 Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (eContactName.length>20) {
    alert_text = alert_text+"Emergency Contact Name is above 20 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((numberRegex.test(eContactNum) != true) && (eContactNum.length!=0)) {
    alert_text = alert_text+"Emergency Contact Number does not contain 11 digits,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((quals1.length>25) || (quals2.length>25) || (quals3.length>25)) {
    alert_text = alert_text+"Please ensure your Qualifications values do not exceed 25 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (companyName.length>30) {
    alert_text = alert_text+"Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r1companyName.length>30) {
    alert_text = alert_text+"Referee 1 Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if (r2companyName.length>30) {
    alert_text = alert_text+"Referee 2 Company Name is above 30 characters,"+"\n";
    checkbox_and_info_issues += 1;
  }
  if ((emailRegex.test(r1emailAddress) != true) && (r1emailAddress.length!=0)) {
    alert_text = alert_text+"Referee 1 email is invalid,"+"\n";
    checkbox_and_info_issues += 1;
  }

  if ((r1emailAddress.length==0) && (checkbox_and_info_issues != 0)){
    alert_text = alert_text+"Please enter an email address for Referee 1,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((emailRegex.test(r2emailAddress) != true) && (r2emailAddress.length!=0)) {
    alert_text = alert_text+"Referee 2 email is invalid,"+"\n";
    checkbox_and_info_issues += 1;
  }

  if ((r2emailAddress.length==0) && (checkbox_and_info_issues != 0)){
    alert_text = alert_text+"Please enter an email address for Referee 2,"+"\n";
    checkbox_and_info_empty_issues += 1;
  }
  if ((DateValidation(dateOfBirth) == false) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)){
  alert_empty_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;
} else if ((dateOfBirth3 > 2016) || (dateOfBirth3 < 1900) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)) {
  alert_emtpy_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;
} else if ((DoBRegex.test(dateOfBirth3) != true) || (dateOfBirth1.length!=0) || (dateOfBirth2.length!=0) || (dateOfBirth3.length!=0)) {
  alert_emtpy_text = alert_text+"Date of birth entered is invalid,"+"\n";
  checkbox_and_info_issues += 1;
}
  if ((checkbox_and_info_issues>0) && failure_empty != list_of_form_input_values.length - 2) {
    pass = false;
    alert(alert_text);
  }
  return pass;
}


$(document).ready(function() { //sets up auto input switch
  $("#fName").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 3) { //Check if length is max length
      $(".fNError1").fadeIn("slow");
    } else {
      $(".fNError1").fadeOut();
    }
  });
});


$(document).ready(function() { //sets up auto input switch
  $("#lName").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError2").fadeIn("slow");
    } else {
      $(".fNError2").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#DOB1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError3").fadeIn("slow");
    } else {
      $(".fNError3").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#DOB2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError4").fadeIn("slow");
    } else {
      $(".fNError4").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#DOB3").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 3) { //Check if length is max length
      $(".fNError5").fadeIn("slow");
    } else {
      $(".fNError5").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#NI1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError6").fadeIn("slow");
    } else {
      $(".fNError6").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#NI2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError7").fadeIn("slow");
    } else {
      $(".fNError7").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#NI3").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError8").fadeIn("slow");
    } else {
      $(".fNError8").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#NI4").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError9").fadeIn("slow");
    } else {
      $(".fNError9").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#NI5").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 0) { //Check if length is max length
      $(".fNError10").fadeIn("slow");
    } else {
      $(".fNError10").fadeOut();
    }
  });
});

$(document).ready(function() { //sets up auto input switch
  $("#PC1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 3) { //Check if length is max length
      $(".fNError11").fadeIn("slow");
    } else {
      $(".fNError11").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#PC2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError12").fadeIn("slow");
    } else {
      $(".fNError12").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#CN").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 10 || this.value.length > 11 ) { //Check if length is max length
      $(".fNError13").fadeIn("slow");
    } else {
      $(".fNError13").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#ECName").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError14").fadeIn("slow");
    } else {
      $(".fNError14").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#ECNum").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 10 || this.value.length > 11 ) { //Check if length is max length
      $(".fNError15").fadeIn("slow");
    } else {
      $(".fNError15").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#Q1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError16").fadeIn("slow");
    } else {
      $(".fNError16").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#Q2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError17").fadeIn("slow");
    } else {
      $(".fNError17").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#Q3").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError18").fadeIn("slow");
    } else {
      $(".fNError18").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#CompName").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError19").fadeIn("slow");
    } else {
      $(".fNError19").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#DOC1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError20").fadeIn("slow");
    } else {
      $(".fNError20").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#DOC2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError21").fadeIn("slow");
    } else {
      $(".fNError21").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#DOC3").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 1) { //Check if length is max length
      $(".fNError22").fadeIn("slow");
    } else {
      $(".fNError22").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFFN").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError23").fadeIn("slow");
    } else {
      $(".fNError23").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFLN").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError24").fadeIn("slow");
    } else {
      $(".fNError24").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFJT").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError25").fadeIn("slow");
    } else {
      $(".fNError25").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFCompName").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError26").fadeIn("slow");
    } else {
      $(".fNError26").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFADL1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length > 50) { //Check if length is max length
      $(".fNError27").fadeIn("slow");
    } else {
      $(".fNError27").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFADL2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length > 50) { //Check if length is max length
      $(".fNError28").fadeIn("slow");
    } else {
      $(".fNError28").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFPCL1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 3) { //Check if length is max length
      $(".fNError29").fadeIn("slow");
    } else {
      $(".fNError29").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFPCL2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError30").fadeIn("slow");
    } else {
      $(".fNError30").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFCN").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError31").fadeIn("slow");
    } else {
      $(".fNError31").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RFEA").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError32").fadeIn("slow");
    } else {
      $(".fNError32").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2FN").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError33").fadeIn("slow");
    } else {
      $(".fNError33").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2LN").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError34").fadeIn("slow");
    } else {
      $(".fNError34").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2JT").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError35").fadeIn("slow");
    } else {
      $(".fNError35").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2CompName").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError36").fadeIn("slow");
    } else {
      $(".fNError36").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2ADL1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length > 50) { //Check if length is max length
      $(".fNError37").fadeIn("slow");
    } else {
      $(".fNError37").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2ADL2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length > 50) { //Check if length is max length
      $(".fNError38").fadeIn("slow");
    } else {
      $(".fNError38").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2PC1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError39").fadeIn("slow");
    } else {
      $(".fNError39").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2PC2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError40").fadeIn("slow");
    } else {
      $(".fNError40").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2CN").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 10 || this.value.length > 11) { //Check if length is max length
      $(".fNError41").fadeIn("slow");
    } else {
      $(".fNError41").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#RF2EA").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length < 2) { //Check if length is max length
      $(".fNError42").fadeIn("slow");
    } else {
      $(".fNError42").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#ADL1").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length > 50) { //Check if length is max length
      $(".fNError43").fadeIn("slow");
    } else {
      $(".fNError43").fadeOut();
    }
  });

$(document).ready(function() { //sets up auto input switch
  $("#ADL2").keyup(function() { //When key is pressed on national insurance input box
    if (this.value.length >50) { //Check if length is max length
      $(".fNError44").fadeIn("slow");
    } else {
      $(".fNError44").fadeOut();
    }
  });
