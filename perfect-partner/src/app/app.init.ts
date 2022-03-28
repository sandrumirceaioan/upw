import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: environment.url,
                realm: environment.realm,
                clientId: environment.clientId,
            },
            initOptions: {
                checkLoginIframe: true,
                checkLoginIframeInterval: 25,
                enableLogging: true
            },
            loadUserProfileAtStartUp: true
        });
}