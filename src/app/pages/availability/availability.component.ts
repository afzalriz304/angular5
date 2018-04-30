import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AvailabilityComponent implements OnInit {

    doctor: any;
    slots: any[];
    doctorAvailablity: any;
    firstSlot: { 'from': string; 'to': string; };
    // slots: { 'date': number; 'slots': { 'from': string; 'to': string; }[]; };
    e: string;
    end: Date;
    s: string;
    date: any;
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
};

private myForm: FormGroup;
private start: Date;
response: any;
constructor(private formBuilder: FormBuilder) { }


ngOnInit() {
    this.myForm = this.formBuilder.group({
        // Empty string or null means no initial value. Can be also specific date for
        // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
        // value.

        myDate: [null, Validators.required]
        // other controls are here...
    });

    const data = {
        'status': true,
        'message': 'SUCCESS',
        'data': {
            'doctorAvailability': [
                {
                    'date': 1525862544909,
                    'slots': [
                        {
                            'from': '09:30:pm',
                            'to': '01:00:pm'
                        }
                    ]
                },
                {
                    'date': 1525862544909,
                    'slots': [
                        {
                            'from': '09:30:pm',
                            'to': '01:00:pm'
                        }
                    ]
                },
                {
                    'date': 1524805571397,
                    'slots': [
                        {
                            'from': '04:30:pm',
                            'to': '09:00:pm'
                        }
                    ]
                },
                {
                    'date': 1524875571397,
                    'slots': [
                        {
                            'from': '04:30:pm',
                            'to': '06:00:pm'
                        },
                        {
                            'from': '06:30:pm',
                            'to': '09:00:pm'
                        }
                    ]
                },
                {
'date': 1524807072030,
                    'slots': [
                        {
                            'from': '04:30:pm',
                            'to': '09:00:pm'
                        }
                    ]
                }
            ],
            'dateRange': {
                'endDate': 1526021922526,
                'startDate': 1524812322526
            }
        }
    };
    this.response = data.data;
    this.start = new Date(this.response.dateRange.startDate);
    this.end = new Date(this.response.dateRange.endDate);
    this.s = this.start.toDateString();
    this.e = this.end.toDateString();
    const len = this.response.doctorAvailability;
    this.doctorAvailablity     =    this.response.doctorAvailability;
    this.available(this.doctorAvailablity);
    console.log('response', this.response);
    console.log('length', len.length);
    for (let i = 0; i < len.length; i++) {

        // this.slots.push(this.response.doctorAvailability[i]);
        // this.slots = { 'date': data.data.doctorAvailability[i].date ,
        //                  'slots': { 'from': data.data.doctorAvailability[i].slots[i].from ,
        //                      'to': data.data.doctorAvailability[i].slots[i].to; }[]; };
        console.log('Slots array', this.slots);
    }

    console.log('Slots', this.slots);
    console.log('Start date', data);

}

available(doc) {
    console.log('all available slots', doc);

    this.doctor = doc;
}

setDate(): void {
    // Set today date using the patchValue function
    const date = new Date();
    this.myForm.patchValue({myDate: {
    date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()}
    }});
}

clearDate(): void {
    // Clear the date using the patchValue function
    this.myForm.patchValue({myDate: null});
}

dateValidation() {
    const date = this.date;
    console.log('Date coming from view', date);
    }





}
