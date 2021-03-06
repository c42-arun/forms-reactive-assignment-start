import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  theForm: FormGroup;
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  formValue = {
    'projectName': '',
    'projectEmail': '',
    'projectStatus': ''
  };
  submitted = false;

  onFormSubmit() {
    this.submitted = true;
    console.log(this.theForm);

    this.formValue.projectName = this.theForm.value.projectName;
    this.formValue.projectEmail = this.theForm.value.projectEmail;
    this.formValue.projectStatus = this.theForm.value.projectStatus;
  }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'projectName': new FormControl(null, Validators.required, this.userNameCheckAsync),
      'projectMail': new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new FormControl('Critical')
    });
  }

  userNameCheckAsync(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        const projectName = control.value;

        if (projectName === 'Test') {
          resolve({'invalidProjectName': true});
        } else {
          resolve(null);
        }
      }, 2000);
    });

    return promise;
  }
}
