using {
    Currency,
    managed,
    sap
} from '@sap/cds/common';

using {API_BUSINESS_PARTNER as bupa} from '../srv/external/API_BUSINESS_PARTNER';

namespace sap.capire.bookstore;


entity Books : managed {
    key ID       : Integer;
        title    : localized String(111);
        descr    : localized String(1111);
        author   : Association to Authors;
        genre    : Association to Genres;
        stock    : Integer;
        price    : Decimal(9, 2);
        currency : Currency;
}

entity Authors : managed {
    key ID    : Integer;
        name  : String(111);
        books : Association to many Books
                    on books.author = $self;
}

/**
 * Hierarchically organized Code List for Genres
 */
entity Genres : sap.common.CodeList {
    key ID       : Integer;
        parent   : Association to Genres;
        children : Composition of many Genres
                       on children.parent = $self;
}

entity Episodes {
    key ID          : String @title: 'Epidode ID';
        title       : String @title: 'Episode Title';
        participant : Association to many bupa.A_BusinessPartner;
}

entity Participants as projection on bupa.A_BusinessPartner {
    key BusinessPartner          as ID,
        BusinessPartnerFullName  as fullName,
        BusinessPartnerIsBlocked as isBlocked
}
