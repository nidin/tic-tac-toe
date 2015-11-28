/**
 * Created by Nidin Vinayakan on 28-11-2015.
 */
module nid {

    /**
     * Handles small notifications
     */
    export class Notification {

        static dom:any;
        static title:any;
        static msg:any;

        /**
         * Show notification message with title
         * @param title
         * @param message
         */
        static show(title:string, message:string) {
            if (!Notification.dom) {
                var container = document.createElement('div');
                var _title = document.createElement('div');
                var _msg = document.createElement('div');
                container.id = "notification";
                _title.className = "notification_title";
                container.appendChild(_title);
                container.appendChild(_msg);
                Notification.dom = container;
                Notification.title = _title;
                Notification.msg = _msg;
            }
            document.body.appendChild(Notification.dom);
            Notification.msg.innerHTML = message;
            Notification.title.innerHTML = title;
        }

        /**
         * Clear notification
         */
        static clear(){
            if(document.body.contains(Notification.dom)){
                document.body.removeChild(Notification.dom);
            }
        }

    }

}
