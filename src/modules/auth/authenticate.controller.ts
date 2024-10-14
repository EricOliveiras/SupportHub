import {UserService} from "../user/user.service";
import {Request, Response} from "express";
import {AuthenticateService} from "./authenticate.service";

export class AuthController {
    constructor(private readonly authService: AuthenticateService) {}

    public async login(req: Request, res: Response) {
        const {email, password} = req.body;
        const auth = await this.authService.login({email, password});
        return res.status(200).json({auth});
    }
}