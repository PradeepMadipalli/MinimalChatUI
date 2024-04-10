import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConversationHistoryRequest, Sendmessages } from '../model/registration.model';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  messages: any[] = [];
  messageid:string;
  newMessage: string = '';
  editIndex: number = -1;
  showButtons: boolean[] = [];
  users: any[];
  messagess:any[];
  responseData: any;
  mreceverid: string;
  messageForm: FormGroup;
  sentmessages: Sendmessages;
  currentUser:string;
  getconverstion: ConversationHistoryRequest;
  constructor(private authService: UsersService, private fb: FormBuilder, private confis:ConfigService) { 
    this.showButtons = new Array(this.messages.length).fill(false);
  }
  ngOnInit() {

    this.messageForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
    this.authService.getUser().subscribe(
      (response: any) => {
        this.users = response.userrs;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
this.currentUser=this.confis.getCuurectuserid();
  }
  receverclick(receverid: any) {
    console.log(receverid);
    this.mreceverid = receverid;
    this.getconverstion = {
      UserId: receverid,
      Before: new Date(),
      Count: 30,
      Sort: 'desc'

    }
   this.getmessagess();
  }
  sendMessage(): void {
    if (this.messageForm.valid) {
      console.log(this.messageForm.get('message').value);
      console.log(this.mreceverid);

      this.sentmessages = {
        Content: this.messageForm.get('message').value,
        ReceiverId: this.mreceverid
      }
      console.log(this.sentmessages)
      this.authService.sendMessage(this.sentmessages).subscribe(

        response => {
        this.getmessagess();
          console.log('Message sent successfully:', response);
          // Handle success, such as displaying a confirmation message
          this.messageForm.reset(); // Reset the form after sending
        },
        error => {
          console.error('Error sending message:', error);
          // Handle error, such as displaying an error message to the user
        }
      );
    }
  }
  getmessagess(){
    this.getconverstion = {
      UserId: this.mreceverid,
      Before: new Date(),
      Count: 30,
      Sort: 'desc'

    }
    this.authService.GetConversationHistory(this.getconverstion).subscribe(

      response => {
        this.messagess =response.messages
        console.log('Message sent successfully:', this.messagess);
        // Handle success, such as displaying a confirmation message
        this.messageForm.reset(); // Reset the form after sending
      },
      error => {
        console.error('Error sending message:', error);
        // Handle error, such as displaying an error message to the user
      }
    );
  }
  logout(){
    this.confis.logout();
  }
  sendMessage1() {
    if (this.newMessage.trim() === '') {
      return; // Ignore empty messages
    }
    // Assuming the receiver is hardcoded for demonstration
    this.messages.push({ sender: this.currentUser, receiver: 'Bob', content: this.newMessage });
    this.showButtons.push(false); // Push false to showButtons array for the new message
    this.newMessage = ''; // Clear the input field
  }

  editMessage(index: number) {
    this.editIndex = index;
    this.messageid=this.messagess[index].id
    this.newMessage = this.messagess[index].content;
    console.log(this.newMessage);
    this.messageForm.get('message').setValue(this.newMessage);
  }

  saveEdit() {
    if (this.editIndex !== -1) {
      this.messagess[this.editIndex].content = this.newMessage;
      this.newMessage = ''; // Clear the input field
      this.editIndex = -1;
    }
  }

  deleteMessage(index: number) {
    this.messagess.splice(index, 1);
    this.showButtons.splice(index, 1); // Remove corresponding item from showButtons array
  }

  toggleButtons(show: boolean, index: number) {
    this.showButtons[index] = show;
  }

}
