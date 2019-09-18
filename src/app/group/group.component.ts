import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'app-group',
   templateUrl: './group.component.html',
   styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

   messageForm: FormGroup;
   constructor(private formBuilder: FormBuilder,
      private serverService: ServerService,
      private router: Router,
      private route: ActivatedRoute,
      private cookieService: CookieService) { }

   cookieValue: any;
   userChat: any;
   cookieUser: any;
   currentUser: any;
   anotherUser: any;
   userNameCookie: any;
   userList: any;
   cookieUsername: any;
   userListLoop: any;
   groupId: any;
   createdBy: any;
   userStatus: any;
   authUser: any;
   joinG: any;
   approvedUser: any;

   ngOnInit() {

      this.groupId = this.route.snapshot.paramMap.get('groupName');
      
      this.messageForm = this.formBuilder.group({
         message: ['', Validators.required]
      });
      this.cookieService.set('username', 'abcdef');
      this.cookieService.set('user_level', 'admin');
      this.usersAuthorization();
   }

   getMessages() {
      var _cookieUser = this.cookieService.get('username');
      this.serverService.getMessages()
         .subscribe(response => {
            this.cookieUser = _cookieUser;
            this.userChat = response.data;
            this.userNameCookie = this.userChat.username
         })
   }

   getUsers() {
      var _cookieUser = this.cookieService.get('username');
      this.serverService.getUsers()
         .subscribe(response => {
            this.cookieUsername = _cookieUser;
            this.userList = response.data;
            this.userList.forEach(element => {
               this.createdBy = element.created_by;
               this.userListLoop = element.users;
               element.users.forEach(item => {
                  this.userStatus = item.status;
               })
            });
         })
   }

   usersAuthorization() {
      let _cookieUser = this.cookieService.get('username');
      let params =  this.route.snapshot.paramMap.get('groupName')

      const data = {
         group_name: params,
         username: _cookieUser
      }

      this.serverService.userPermission(data)
      .subscribe(response => {
         this.authUser = response.data;
         if(this.authUser != false) {
            this.getUsers();
            this.getMessages();
            this.authUser.forEach(element => {
               element.users.forEach(item => {
                  if(item.username == _cookieUser)
                     this.approvedUser = item.status
                  });
            });
         }
      });
   }

   removeUser(username) {
      const data = {
         group_name: this.groupId,
         username: username
      }
      this.serverService.deleteUser(data)
      .subscribe(response => {
         window.location.reload(); 
      })
   }

   joinGroup(status){
      let _cookieUser = this.cookieService.get('username');
      let user_level = this.cookieService.get('user_level');
      let params =  this.route.snapshot.paramMap.get('groupName');
      console.log(status);
      const data = {
         group_name: params,
         username: _cookieUser,
         user_level: user_level,
         clickStatus: status
      }

      this.serverService.joinRequest(data)
      .subscribe(response => {
         this.joinG = response.data;
      });
   }

   approveStatus(username, status) {
      let data = {
         group_name:  this.route.snapshot.paramMap.get('groupName'),
         username: username,
         status: status
      }
      this.serverService.approvalStatus(data)
      .subscribe(response => {
         this.joinG = response.data;
      });
   }

   submitMessage() {
      let messageForm = this.messageForm.value;

      let messageData = {
         username: this.cookieService.get('username'),
         message: messageForm.message
      }

      this.serverService.insertMessage(messageData)
         .subscribe(data => {
            console.log(data);
         })
      this.getMessages();
   }

}
