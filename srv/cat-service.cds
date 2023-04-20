using {sap.capire.bookstore as my} from '../db/schema';

service CatalogService @(path: '/catalog') {

    @readonly
    entity Books as
        select from my.Books {
            *,
            author.name as author
        }
        excluding {
            createdBy,
            modifiedBy
        };

    @requires: 'authenticated-user'
    action   submitOrder(book : Books:ID, quantity : Integer);

    function hello(to : String) returns String;

}
