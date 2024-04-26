import bcrypt from 'bcryptjs';

const saltRounds = 10;
export const encrypt = {
    hash: async function(password: string) {
        const salt = bcrypt.genSaltSync(saltRounds);
        return await bcrypt.hash(password, salt);
    },
    compare: async function(planePassword: string, hashPassword: string) {
        return await bcrypt.compare(planePassword, hashPassword);
    }
}