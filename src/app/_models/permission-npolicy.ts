/**
 * SubModel for filterNpolicy
 * 
 * it include user account permission datas
 *  localisation = user agree WebApp Access to Request for Localisation Request (Browser or mobile system)
    storage = user agree WebApp Access to Browser Storage (Browser or mobile system)
    camera is actualy not in use (maybe nessessary for android version of WebApp)
    localisation = user agree WebApp Access to Request for Localisation Request (Browser or mobile system)
    policy means user agree private policy
*/

export class PermissionNpolicy {
    localisation:boolean=false;
    storage:boolean=false;
    camera:boolean=false;
    policy:boolean=false;
}
