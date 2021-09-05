import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interface/user.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('USER_MODEL') private readonly userModel: Model<User>
    ) { }

    /**
     * @description 注册方法
     * @param {User} user 
     * @returns 
     */
    public regist = async (user: User) => {
        return this.userModel.find({
            phone: user.phone
        })
            .then(res => {
                if (res.length !== 0) {
                    console.log('该手机号码已被注册')
                    throw Error('该手机号码已被注册')
                }
            })
            .then(() => {
                try {
                    const createUser = new this.userModel(user)
                    return createUser.save()
                } catch (error) {
                    throw Error('注册失败' + error)
                }
            })
            .catch(err => {
                console.warn(`发生问题，${err}`);
            })
    }
}
