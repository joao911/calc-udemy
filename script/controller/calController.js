class CalController {

    constructor() {
        this._operation = [];
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initButtonEvents();
        this.initialize();
    }
    initialize() {
        this.setDisplayTamiDate()
        setInterval(() => {
            this.setDisplayTamiDate()
        }, 1000)

        this.setLastNumberToDisplay();

        /* displayCalcEl.innerHTML = "123456" */
    }
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }
    clearAll() {
        this._operation = [];

        this.setLastNumberToDisplay();
    }
    clearEntry() {
        this._operation.pop();

        this.setLastNumberToDisplay();
    }

    getLastOperation() {

        return this._operation[this._operation.length - 1]
    }
    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperation(value) {
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }
    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();
        }
    }
    calc() {
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));

        if (last == '%') {
            result /= 100;

            this._operation = [result];

        } else {



            this._operation = [result, last];
        }



        this.setLastNumberToDisplay();
    }
    setLastNumberToDisplay() {
        let lastNumber;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (!this.isOperation(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }

        if(!lastNumber){
            return lastNumber = 0;
        }

        this.displayCalc = lastNumber;

    }

    AddOperator(value) {


        if (isNaN(this.getLastOperation())) {

            if (this.isOperation(value)) {

                this.setLastOperation(value)

            } else if (isNaN(value)) {

                console.log('outra coisa', value)

            } else {

                this.pushOperation(value);

                this.setLastNumberToDisplay();
            }

        } else {
            if (this.isOperation(value)) {

                this.pushOperation(value);

            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();
            }
        }
    }
    setError() {
        this.displayCalc = "Error";
    }


    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.AddOperator('+');
                break;
            case 'subtracao':
                this.AddOperator('-');
                break;
            case 'multiplicacao':
                this.AddOperator('*');
                break;
            case 'divisao':
                this.AddOperator('/');
                break;
            case 'porcento':
                this.AddOperator('%');
                break;
            case 'igual':

                break;
            case 'ponto':
                this.AddOperator('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.AddOperator(parseInt(value));
                break;
            default:
                this.setError();
                break;

        }
    }
    initButtonEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer"
            })
        })
    }


    setDisplayTamiDate() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }
    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }
    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        this._currentDate = value;
    }

}