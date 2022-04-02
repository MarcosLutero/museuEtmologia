const storeKey = 'STATE';

export const initialState = {
    token: null,
    usuario: null,
    modulo: null,
    conteudo: "LoginForm",
    props: {},
    toasts: [],
    menus: [],
    modal: {
        show: false,
        titulo: null,
        conteudo: null
    },
    titulo: 'Museu da UFRA',
    config: {
        FRONTEND_URL: 'http://ufra.pa.gov.br',
        BACKEND_URL: 'http://ufra.pa.gov.br:8080',
        CONFIGURE_URL: 'http://ufra.pa.gov.br:8080/configuracao/frontend'
    },
    toastKey: 0,
    expirado: false,

}

export const loadState = () => {

    if (/recuperar/.test(window.location)) return initialState;

    try {
        const serializedState = localStorage.getItem(storeKey);
        const state = serializedState? JSON.parse(serializedState) : initialState;
        initHistory(state);
        return state;
    } catch (err) {
        return initialState;
    }

}

export const serializableState = state => ({

    //Gravar estes dados serializáveis
    token: state.token,
    usuario: state.usuario,
    modulo: state.modulo,
    menus: state.menus,
    conteudo: state.conteudo,
    props: state.props,
    titulo: state.titulo,
    config: state.config,
    expired: state.expired,        

    //Resete estes dados não serializáveis
    toasts: initialState.toasts,
    modal: initialState.modal, 
    toastKey: initialState.toastKey,

});

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(serializableState(state));
        localStorage.setItem(storeKey, serializedState);
    } catch (err) {
    }
};

export const initHistory = state => {
    // Desativar o histórico enquanto não utilizar https
    // window.history.replaceState(serializableState(state), "PISP", initialState.config.FRONTEND_URL);
}

export const pushHistory = state => {
    // Desativar o histórico enquanto não utilizar https
    // window.history.pushState(serializableState(state), "PISP", initialState.config.FRONTEND_URL);
}

export const clearHistory = () => {
    try {
        localStorage.setItem(storeKey, null);
    } catch (err) {
    }
}
