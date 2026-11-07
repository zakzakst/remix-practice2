declare namespace Components {
    namespace Schemas {
        export interface User {
            /**
             * example:
             * 1
             */
            id: number;
            /**
             * example:
             * Taro
             */
            name: string;
            /**
             * example:
             * taro@example.com
             */
            email: string; // email
        }
    }
}
declare namespace Paths {
    namespace Users {
        namespace Get {
            namespace Responses {
                export type $200 = Components.Schemas.User;
                export interface $400 {
                    /**
                     * example:
                     * invalid_request
                     */
                    error?: string;
                    /**
                     * example:
                     * アクセストークンが指定されていません
                     */
                    error_description?: string;
                }
            }
        }
    }
}
