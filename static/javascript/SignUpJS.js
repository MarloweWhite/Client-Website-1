$(document).ready(function(){ //sets up auto input switch
  $(".natInsNum").keyup(function () {//When key is pressed on national insurance input box
      if (this.value.length == this.maxLength) { //Check if length is max length
        var $next = $(this).next('.natInsNum'); //Setting next input to go to
        if ($next.length){
            $(this).next('.natInsNum').focus();//Goto next input
        }
        else{
            $(this).blur();
          }
        }
      });

  $(".pCode").keyup(function () {//When key is pressed on postcode input box
      if (this.value.length == this.maxLength) { //Check if length is max length
        var $next = $(this).next('.pCode'); //Setting next input to go to
        if ($next.length){
            $(this).next('.pCode').focus();//Goto next input
        }
        else{
            $(this).blur();
        }
      }
  });

  $('.subBut').click(function() {
        var title = $('title');
        var fName = $('fName');
        var lName = $('lName');
        var dateOfBirth = $('dateOfBirth');
        var natInNum1 = $('natInsNum1');
        var natInNum2 = $('natInsNum2');
        var natInNum3 = $('natInsNum3');
        var natInNum4 = $('natInsNum4');
        var natInNum5 = $('natInsNum5');
        var adLine1 = $('adLine1');
        var adLine2 = $('adLine2');
        var pCode1 = $('pCode1');
        var pCode2 = $('pCode2');
        var contactNum = $('contactNum');
        var eContactName = $('eContactName');
        var eContactNumber = $('eContactNumber');
        var quals1 = $('quals1');
        var quals2 = $('quals2');
        var quals3 = $('quals3');
        var companyType = $('companyType');
        var companyName = $('companyName');
        var eligibleUK = $('eligibleUK');
        var eligibleUKDocs1 = $('eligibleUKDocs1');
        var eligibleUKDocs2 = $('eligibleUKDocs2');
        var eligibleUKDocs3 = $('eligibleUKDocs3');
        var crimCheck = $('crimCheck');
        var crimInfo = $('crimInfo');
        var disCheck = $('disCheck');
        var disInfo = $('disInfo');
        var email = $('email');
        var password = $('password');

        $.ajax({
            url: '/signUpUser',
            data: $('form').serialize(),
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});

//JS Validation of User Input to SignupPage
function validate() {
  var ninRegex = /^[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z][0-9][0-9][0-9][0-9][0-9][0-9][A-DFM]$/;

  //Gathering user input on the signup page to perform checks on
  var title = (document.forms[".signUpForm"][".title"].value);
  var fName = (document.forms[".signUpForm"][".fName"].value);
  var lName = (document.forms[".signUpForm"][".lName"].value);
  var dateOfBirth = (document.forms[".signUpForm"][".dateOfBirth"].value);

  //Getting seperate inputs so we can put spaces between them for formatting the national insurance number
  var natInNum1 = (document.forms[".signUpForm"][".natInNum1"].value);
  var natInNum2 = (document.forms[".signUpForm"][".natInNum2"].value);
  var natInNum3 = (document.forms[".signUpForm"][".natInNum3"].value);
  var natInNum4 = (document.forms[".signUpForm"][".natInNum4"].value);
  var natInNum5 = (document.forms[".signUpForm"][".natInNum5"].value);

  var natInsNum = natInNum1 + " " + natInNum2 + " " + natInNum3 + " " + natInNum4 + " " + natInNum5;

  document.forms[".signUpForm"][".natInsNum"].value = natInsNum;

  var adLine1 = (document.forms[".signUpForm"][".adLine1"].value);
  var adLine2 = (document.forms[".signUpForm"][".adLine2"].value);

  var pCode1 = (document.forms[".signUpForm"][".pCode1"].value);
  var pCode2 = (document.forms[".signUpForm"][".pCode2"].value);

  var contactNum = (document.forms[".signUpForm"][".contactNumber"].value);

  var eContactName = (document.forms[".signUpForm"][".eContactName"].value);
  var eContactNumber = (document.forms[".signUpForm"][".eContactNumber"].value);

  var quals1 = (document.forms[".signUpForm"][".quals1"].value);
  var quals2 = (document.forms[".signUpForm"][".quals2"].value);
  var quals3 = (document.forms[".signUpForm"][".quals3"].value);

  var companyType = (document.forms[".signUpForm"][".companyType"].value);
  var companyName = (document.forms[".signUpForm"][".companyName"].value);

  var eligibleUK = (document.forms[".signUpForm"][".eligibleUK"].value);
  var eligibleUKDocs1 = (document.forms[".signUpForm"][".eligibleUKDocs1"].value);
  var eligibleUKDocs2 = (document.forms[".signUpForm"][".eligibleUKDocs2"].value);
  var eligibleUKDocs3 = (document.forms[".signUpForm"][".eligibleUKDocs3"].value);

  var crimCheck = (document.forms[".signUpForm"][".crimCheck"].value);
  var crimInfo = (document.forms[".signUpForm"][".crimInfo"].value);

  var disCheck = (document.forms[".signUpForm"][".disCheck"].value);
  var disInfo = (document.forms[".signUpForm"][".disInfo"].value);

  //Validation Check For No input



  //Validation Check for too long



  //Validation specifics e.g phone number must be a number, email must be email



  //Sending data

  params = 'title='+title+'&fName='+fName+'&lName='+lName+'&dateOfBirth='+dateOfBirth+'&natInsNum'+natInsNum+'&adLine1='+adLine1+'&adLine2='+adLine2+'&pCode1='+pCode1+'&pCode2='+pCode2+'&contactNum='+contactNum+'&eContactName='+eContactName+'&eContactNum='+eContactNum+'&quals1='+quals1+'&quals2='quals2+'&quals3='+quals3+'&companyType='+companyType+'&companyName='+companyName+'&eligibleUK='+\
  eligibleUK+'&eligibleUKDocs1='+eligibleUKDocs1+'&eligibleUKDocs2='+eligibleUKDocs2+'&eligibleUKDocs3='+eligibleUKDocs3+'&crimCheck='+crimCheck+'&crimInfo='+crimInfo+'&disCheck'+disCheck+'&disInfo='+disInfo+'&email='+email+'&password'=password;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", '/addUser', true); // true is asynchronous
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onload = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      console.log(xhttp.responseText);
      document.getElementById("txt").innerHTML = xhttp.responseText;
    } else {
      console.error(xhttp.statusText);
    }
  };
  xhttp.send(params);
  return false;
}


};
