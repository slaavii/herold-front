export class Client{
    id: string;
    username: string;
    clientName: string;
    telNumber: string;

    constructor(clientName: string, telNumber: string) {
        this.clientName = clientName;
        this.telNumber = telNumber;
    }
}