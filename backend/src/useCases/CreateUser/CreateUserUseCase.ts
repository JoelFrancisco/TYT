import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IHashPassword } from "../../services/Hash/IHashPassword";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        // private mailProvider: IMailProvider,
        private hashPassword: IHashPassword
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new Error('User already exists.');
        }
        
        const hashedPassword = await this.hashPassword.hash(data.password);
        const { name, email } = data;
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await this.userRepository.save(user);

        // this.mailProvider.sendMail({
        //     to: {
        //         name: data.name,
        //         email: data.email,
        //     }, 
        //     from: {
        //         name: 'Equipe TYT',
        //         email: 'equipetwt@gmail.com',
        //     },
        //     subject: 'Seja bem vinda à plataforma',
        //     body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        // })
    }
}