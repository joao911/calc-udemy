class CalcController {
    constructor() {
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");

        this._currentDate;
        this.initialize();
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();

        }, 1000)
    }

    initButtonEvents(){
        let buttons = document.querySelectorAll('#buttons > g #parts >g') 
    }
    setDisplayDateTime() {
        this.displayDate = new Date().toLocaleDateString(this._locale,{
            day:"2-digit",
            month:"long",
            year: "numeric"
        });
        this.displayTime = new Date().toLocaleTimeString(this._locale)
    }

    get displayTime() {
        return this._timeEl.innerHTML
    }
    set displayTime(value) {
        return this._timeEl.innerHTML = value
    }
    get displayDate() {
        return this._dateEl.innerHTML;
    }
    set displayDate(value) {
        return this._dateEl.innerHTML = value
    }
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(valor) {
        this._displayCalcEl.innerHTML = valor
    }
}