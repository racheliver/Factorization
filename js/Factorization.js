/*********************************************
*  Racheli Verechzon, ID: 305710071             *
*  ======================================       *
*         Exercise 4                            *
*  ======================================       *
***********************************************/


/**********************************summary*************************************************************************************************
In this exercise we will write an application to decompose a number. Each number can be written as a product of two or more prime numbers.*
These numbers are called the "factors" of the number, and the decomposition of the number is called "factorization".                      *
The decomposition can be presented in two ways - either by detailing the initial factors (as in the examples above) or                    *
 by exponential registration, in which each primary factor records the number of times it appears as strong.                              *
In addition, you can view the decomposition tree. The tree contains at each node a number, its right hand is                              *
the primary factor and the left son is the value of the partial node of the primary factor.                                               *
*******************************************************************************************************************************************/



/***************************about the application*************************************
The app will allow the user to enter a number and view its decomposition.           *
The app will contain the following sections:App titles and text field.              *
A text field (in which a placeholder will appear with the string "positive integer")*
 to enter the number. Check box for creating a decomposition tree.                  *
Button calculate Clear button The projection area of ​​the answer.                    *
*************************************************************************************/

/**********************Factorization********************************************
A function that defined in a global space. Variables and functions defined     *
within the function are private and are not accessible outside the function.   *
The replay value of the function is also an object, thus showing the functions *
we want to reveal:getResult and initModule                                     *
*******************************************************************************/

/*********************validateInput*****************************************
If the input is invalid, you will receive an error message as a pop-up.    *
In the case of a number that is incomplete or not positive or contains no  *
digits, but other signs or characters                                      *
****************************************************************************/

/********************************buildArray********************************
The function accepts a row, a column, an array, and a number from the user*
And constructs a two-dimensional array to display the table in section D. *
***************************************************************************/


/******************************Calculations functions************************************************************************
nextPrime: An auxiliary function that I wrote, from Exercise 4 receives a number and returns the next one after it.         *
factorZ: An auxiliary function that I wrote, from Exercise 4 receives a number and send back array with the numbers factors.*
appearance:When an array is received, some instances of each value are returned (an array with two arrays)                  *
****************************************************************************************************************************/

/*********************************buildTree***************************************************************************************
The function receives an array of number and decomposition into its elements and creates with visual tree diagrams as can be seen*
**********************************************************************************************************************************/

/***********************************************initModule***************************************************************************
*When the html page finishes loading, it fires the load event, and we place the listener on the onload attribute.                   *
*In the listener we will write the code we want to happen when the page finishes loading, ie the links of the listeners to the tags:*
We will add a function module named initModule to function as a "constructor" - the function will initialize all necessary          *
application variables and be accessible outside the module: JQuery command structure: $ (selector) .action                          *
The $ sign is the entry to the JQuery environment. Followed by parentheses, selecting an element, and then performing an action on  *
the selected element.The $ function returns a JQuery object that contains functions for manipulating the DOM.                       *
*************************************************************************************************************************************/




var Factorization = function() {

    var initModule = function() {

        $("#divCalc").click(clickListener);
        $("#divClr").click(clickListenerClear);

    };
      var clickListenerClear = function(e) {

          $("#txtWeight").val("");
          $('#chkTree').prop('checked', false);
          $("#txtAnswer").empty();
          $("#answer2").empty();
		      $("#txtAnswer").append("Answer:");
		      $("#answer2").hide();
      }

    var clickListener = function(e) {

        var divCalc = $("#divCalc");
        if(e.type == "click") {
            $("#txtAnswer").empty();
            $("#answer2").empty();
            var container= $("#answer2");
            container.css("visibility", "hidden");
            var err = validateInput();
            if(err == true)
            {
              var w = $("#txtWeight").val();
              var bmi = factorZ(w);
              var array= showByFormat(bmi);
              var array2=showByFormat2(bmi);

                if(document.getElementById("chkTree").checked === false){
                  container= $("#answer2");
                  container.css("visibility", "visible");
                  container.css("display", "block");
                  container.hide();
                  if(bmi.length>1)
                  $("#txtAnswer").append("Answer:\n \n" + "The Prime Factorization is: \n" + (array)+ "   \n \n" + "In Exponential Form: \n" + array2);
                  else {
                      $("#txtAnswer").append("Answer:\n \n the number is prime And therefore has no factorization");
                  }
                }
                else{
                  if(bmi.length>1){
                     container.css("visibility", "visible");
                     container.css("display", "block");
                     $("#txtAnswer").append("Answer:\n \n" + "The Prime Factorization is: \n" + (array) + "   \n \n" + "In Exponential Form: \n" + array2);
                     var x=  buildArray(((bmi.length*2) -1),(bmi.length+1),w,bmi);
                     var tree=bulidTree(((bmi.length*2) -1),(bmi.length+1),x);
                   }
                     else {
                         $("#txtAnswer").append("Answer:\n \n the number is prime ");
                     }

                }
            }
            else{
              clickListenerClear();
            }
        }
    };

    function validateInput() {
        var w = $("#txtWeight").val();
        var res = true;
        var errNull = "Must contain a value";
        var errNeg  = "Value must be positive";
        var errInt  = "Value must be Integer";
        var errNum  = "Value must be Number";
        var errW = $("#divErrWeight");

        if(w == "")
        {
            res = false;
            errW.html(errNull);
        }
        else if(parseInt(w) <= 0)
        {
            res = false;
            errW.html(errNeg);
        }
        else if(!(Number.isInteger(parseFloat(w))))
       {
           res = false;
           errW.html(errInt);
       }

        else if (!(/^\d+$/.test(w)))
        {
           res = false;
           errW.html(errNum);
        }

        else
            errW.html("");
        return res;
    }



    function nextPrime(num)
    {
      while(true)
      {
        var isPrime=true;
        num+=1;
        var sqt =parseInt(Math.sqrt(num));
        for (var i = 2; i <= sqt; i++) {
          if(num%i===0){
           isPrime=false;
           break;
        }
        }
        if(isPrime)
          return parseInt(num);
      }
    }

    function factorZ(n){

      var p=2,factors = [];
         while (n!==1)
         {
               if(n % p === 0)
               {
                 factors.push(p);
                 n = n / p;
               }
              else
                 p=nextPrime(p);
         }
        return factors;
    }
    function showByFormat(array)
    {

      var str="";
      for (var i = 0; i < array.length; i++) {
        str+=array[i];
        if (i!=(array.length)-1)
        str+="x";
      }
      return str;
    }

    function appearance(arr) {
        var a = [], b = [], prev;

        arr.sort();
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] !== prev ) {
                a.push(arr[i]);
                b.push(1);
            } else {
                b[b.length-1]++;
            }
            prev = arr[i];
        }

        return [a, b];
    }




    function showByFormat2(array)
    {

      var temp= appearance(array);
      var str="";var length=temp[0].length;
      for (var i = 0; i < length; i++) {

        str+=temp[0][i];
        str+="<sup>"
        str+=temp[1][i];
        str+="</sup>"

        if(i!=(length-1))
        str+="x ";

      }

    return str;
    }

    function buildArray(row,column,num,arr){
	    var matrix = new Array(row);

        for (var i = 0 ; i < row ; i++) {
         matrix[i] = new Array(column);}

        for(var i = 0; i < row; i++){
	      for(var j =0; j < column; j++){
		     matrix[i][j]=' ';}}


        var num1 = 0;
        var num2 = 2;
        var index =0;
	    matrix[0][1]=num;


       for(var r =1 ; r < row ; r++){
	     for(var c =0 ; c < column ; c++){
		   if(r%2!==0&&c===num1+1){matrix[r][c]='/'+' \\  ';}
           if(r%2===0&&c===num1){
	           matrix[r][c]=arr[index];
		         num=num/arr[index];
		         index++;}
           if(r%2===0&&c===num2){matrix[r][c]=num;}
		}
		 if(r%2===0){num1++;num2++;}
		}
	return matrix;
	}

  function bulidTree(rows,cols,a){


		 var table = '';

	     for(var r = 0; r < rows; r++){
		   table += '<tr>';
		   for(var c = 0; c < cols; c++ ){
		   table += '<td>' + a[r][c] + "</td>";}
	     table += '</tr>';}

		  $('#answer2').append("Prime Factors Tree \n");
          $('#answer2').append(  '<table>' );
          $('#answer2').append( table );
          $('#answer2').append(  '</table>' );

	}

    return { initModule : initModule };
}();

$(document).ready(function() {Factorization.initModule(); });
