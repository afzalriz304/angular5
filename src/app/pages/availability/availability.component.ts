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

    firstSlot: { 'from': string; 'to': string; };
    slots: { 'date': number; 'slots': { 'from': string; 'to': string; }[]; };
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

    this.start = new Date(data.data.dateRange.startDate);
    this.end = new Date(data.data.dateRange.endDate);
    this.s = this.start.toDateString();
    this.e = this.end.toDateString();
    const len = data.data.doctorAvailability;
    console.log('length', len.length);
    for (let i = 0; i < len.length; i++) {
        this.slots = data.data.doctorAvailability[i];
    }
    
    this.firstSlot = this.slots.slots[0];
    console.log('Slot 1', this.slots);
    console.log('Start date', data);

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
