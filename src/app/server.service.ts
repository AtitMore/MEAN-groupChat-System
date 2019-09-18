import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable()

export class ServerService {

    constructor(private http: HttpClient) {}

    insertMessage(body){
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
        return this.http.post('api/group/insert_messages', body)
            .pipe(map((response: any) => response
        ));
    }

    getMessages() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
        return this.http.get('api/group/get_messages', {})
            .pipe(map((response: any) => response
        ));
    }

    getUsers() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
        return this.http.get('api/group/get_user_list', {})
            .pipe(map((response: any) => response
        ));
    }

    deleteUser(data) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
        return this.http.post('api/group/remove_user', data)
            .pipe(map((response: any) => response
        ));
    }

    userPermission(body) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
        return this.http.post('api/group/user_rights', body)
            .pipe(map((response: any) => response
        ));
    }

    joinRequest(data) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
        return this.http.post('api/group/join_request', data)
            .pipe(map((response: any) => response
        ));
    }

    approvalStatus(data) {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' })
        return this.http.post('api/group/approval_request', data)
            .pipe(map((response: any) => response
        ));
    }
}