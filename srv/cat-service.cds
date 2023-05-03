using {sap.capire.bookstore as my} from '../db/schema';

service CatalogService @(path: '/catalog') {

    type MyResult {
        sum  : Integer;
        text : String;
    }

    @readonly
    entity Books   as
        select from my.Books {
            *,
            author.name as authorname
        }
        excluding {
            createdBy,
            modifiedBy
        }

        actions {
            function sumBound(a : Integer, b : Integer) returns MyResult;
        };

    @readonly
    entity Authors as
        select from my.Authors {
            *,
            null as numberOfBooks : Integer
        };

    @requires: 'authenticated-user'
    action   submitOrder(book : Books:ID, quantity : Integer);

    function hello(to : String)                   returns String;
    function sumUnbound(a : Integer, b : Integer) returns MyResult;


}
