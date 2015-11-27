/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
module nid {

    export class Player {

        public name:string;
        public wins:number = 0;

        constructor(public id:number) {
            this.name = "Player " + id;
        }

        isWin(a) {
            var win:boolean = false;
            //row
            if (a[0] == this.id && a[1] == this.id && a[2] == this.id) {
                win = true;
            }
            if (a[3] == this.id && a[4] == this.id && a[5] == this.id) {
                win = true;
            }
            if (a[6] == this.id && a[7] == this.id && a[8] == this.id) {
                win = true;
            }
            //column
            if (a[0] == this.id && a[3] == this.id && a[6] == this.id) {
                win = true;
            }
            if (a[1] == this.id && a[4] == this.id && a[7] == this.id) {
                win = true;
            }
            if (a[2] == this.id && a[5] == this.id && a[8] == this.id) {
                win = true;
            }
            //diagonal
            if (a[0] == this.id && a[4] == this.id && a[8] == this.id) {
                win = true;
            }
            if (a[6] == this.id && a[4] == this.id && a[2] == this.id) {
                win = true;
            }
            if(win){
                this.wins++;
            }
            return win;

        }
    }
}
