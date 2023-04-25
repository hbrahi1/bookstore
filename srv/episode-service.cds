using {sap.capire.bookstore as my} from '../db/schema';


service EpisodesService @(path: '/episodes') {
    entity Episodes     as projection on my.Episodes;
    entity Participants as projection on my.Participants;

}
