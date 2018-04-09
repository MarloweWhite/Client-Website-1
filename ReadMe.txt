How to Run Project:

Prior to running the project: ensure your Client-Acorn-Project folder lies directly on your Desktop. You need to drag this from the USB to your Desktop.

1) Read requirements.txt. Recognise each of the libraries you need installed. You should be able to complete all of Step 2) and be able to run the virtual
environment supplied, meaning it will not be necessary to pip install the libraries - if you cannot get the virtual environment working as 
instructed in the next step, pip install each of the libraries listed in the requirements.txt text document.

2) Run your virtual environment. Go into your Client-Acorn-Project folder and right click whilst holding shift on whitespace - without having any 
folders or resources selected/highlighted with your cursor.
On the dropdown list offered, select to 'Open command window here'. Once the command window has opened, check the path is correct and 
points to your Client-Acorn-Project file. 

2.a) In your Acorn Project file should sit your AcornVE virtual environment folder. In the command prompt, you need to type 'cd AcornVE' to point
your command prompt into your AcornVE folder. Check the path of your command prompt has updated to look inside of your AcornVE folder.
 
2.b) Next, type 'Scripts\activate' - make sure you separate these words by a BACKWARDS slash. Confirm your path has been updated such that it
follows the text '(AcornVE) C://....[etc]'

2.c) Now type 'cd..' into your command line. Confirm that your command prompt is now pointing back to your root directory of Client-Acorn-Project.
Once this is the case, run the Acorn.py server file by typing in 'py Acorn.py'. Watch the command prompt to see that it runs the server.

3) When the server is running, go to your browser e.g. we used Google Chrome, and type in the following URL address '127.0.0.1:5000/Login' and
this will load the Login/Index page for you! From this page, you choose how to navigate the site.

Extra: To try logging in as an admin (database level 1): Email > M.Jacobs@google.com  Password > hello123