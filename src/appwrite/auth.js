import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.appWriteProjectId)

     this.account = new Account(this.client)
    }
   async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password,name)

            if (userAccount) {
                return this.loginAccount({email,password})
            } else {
                
            }
        } catch (error) {
            throw error;
        }
   }

   async loginAccount({email,password}){
    try {
        return await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw error
    }
   }

   async getCurrentUser(){
    try {
        return await this.account.get()
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error",error);
    }
   }

   async logout(){
    try {
        return await this.account.deleteSession()
    } catch (error) {
        console.log(error);
    }
   }
}

const authService = new AuthService()

export default authService