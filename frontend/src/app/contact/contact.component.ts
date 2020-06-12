import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { ContactService } from '../_services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  isLoadingResults = true;
  submitted = false;

  constructor(
    private contactService: ContactService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('.+@.+\..+')]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }

  onFormSubmit(formData: NgForm) {
    this.submitted = true;
    this.contactService.addContact(formData)
    .subscribe(
      res => {
        this.isLoadingResults = false;
        this.router.navigate(['/']);
      },
      err => {
        console.log(this.email);
        this.isLoadingResults = false;
      }
    );
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onFormSubmit(this.contactForm.value);
    }
  }
}
