window.onload = function (e) {

    // Set local storage
    let countValidWord = document.getElementById('count-valid-word');
    let countValidWordLK = localStorage.getItem('count-valid-word');
    (countValidWordLK == null)? countValidWord.innerText = 0 : countValidWord.innerText = countValidWordLK;

    // Api connect info
    let apiCalls = [
        '/api/search/',
        '/api/search/like/'
    ];
    let host = window.location.protocol + '//' + window.location.host;

    // Autocomplete function
    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                //addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                //addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });

        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    // Api call to get word description
    function suggestWordsOrDescription(url, wordsOrDescription, count) {
        let dataSet = 'no data';
        ajaxRequest = new XMLHttpRequest();

        ajaxRequest.onreadystatechange = function (e) {

            if (ajaxRequest.readyState === 4 && ajaxRequest.status === 200) {

                dataSet = JSON.parse(ajaxRequest.responseText);

                // We are asking for suggested word
                if (wordsOrDescription) {
                    let wordkeys = [];
                    dataSet.forEach(function (val) {
                        wordkeys.push(val.WORD_KEY);
                    });

                    autocomplete(document.getElementById("auto-complete-input"), wordkeys);

                } else {
                    let showDescriptionWord = document.getElementById('show-description-word');
                    showDescriptionWord.textContent = '';

                    // We are asking for word description
                    let dataSetLen = (dataSet.length > 0) ? 1 : 0;

                    if (dataSetLen) {
                        let description = '';
                        dataSet.forEach(function (val) {
                            description += val.WORD_VALUE;
                            description += '\n\n';
                        });

                        //set counter to local storage
                        countValidWord.innerText = parseInt(countValidWord.innerText) + 1;
                        localStorage.setItem('count-valid-word', countValidWord.innerText);

                        showDescriptionWord.textContent = description;
                        return -1;
                    }

                    showDescriptionWord.textContent = 'No description found!!!';
                }


            }

        };

        ajaxRequest.open('GET', url);
        ajaxRequest.send();
    }

    // Add input autocomplete word suggestion
    let dataLiveInput = document.getElementById('auto-complete-input');
    dataLiveInput.addEventListener('keyup', function (e) {
        let dataSearchVal = dataLiveInput.value;
        suggestWordsOrDescription(host + apiCalls[1] + dataSearchVal, true, 1);
    });

    // Get word description
    let getDescriptionBtn = document.getElementById('get-description-btn');
    getDescriptionBtn.addEventListener('click', function (e) {
        let getInputData = dataLiveInput.value;

        let showDescriptionWord = document.getElementById('show-description-word');

        if (getInputData.length <= 0) {
            showDescriptionWord.textContent = 'Please, write your word !!!';
            return -1;
        }
        //showDescriptionWord.value = '';
        suggestWordsOrDescription(host + apiCalls[0] + getInputData, false, 1);
    });

};