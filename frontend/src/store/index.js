import { createStore } from 'redux';
import JWT from 'jsonwebtoken';
import { initialState, loadState, pushHistory, saveState } from './state';


export const actions = {
    delToast: 'DEL_TOAST',
    addToast: 'ADD_TOAST',
    setToken: 'SET_TOKEN',
    resetToken: 'RESET_TOKEN',
    setContent: 'SET_CONTENT',
    setTitle: 'SET_TITLE',
    setModule: 'SET_MODULE',
    openModal: 'OPEN_MODAL',
    closeModal: 'CLOSE_MODAL',
    setConfig: 'SET_CONFIG',
    setState: 'SET_STATE'
};

export const reducer = (state = loadState(), action) => {

    if (state.usuario && action.type !== actions.resetToken){
        const now = Date.now();
        const expiration = state.usuario.exp * 1000;
        if (now > expiration) return {
            ...state,
            expirado: true
        }
    }

    switch (action.type){
        case actions.setState:
            return {
                ...state,
                ...action.state
            };
        case actions.delToast:
            return {
                ...state,
                toasts: state.toasts.filter((toast) => toast.toastKey !== action.toastKey)
            };
        case actions.addToast:
            return {
                ...state,
                toasts: [
                    ...state.toasts,
                    {
                        ...action.toast,
                        toastKey: state.toastKey
                    }
                ],
                toastKey: state.toastKey + 1
            };
        case actions.setToken:
            const usuario = JWT.decode(action.token, {json: true});
            const newState0 = {
                ...state,
                token: action.token,
                conteudo: "DashboardPage",
                modulo: false,
                menus: [],
                usuario: usuario   
            };
            pushHistory(newState0);
            return newState0;
        case actions.setConfig:
            return {
                ...state,
                config: {
                    ...state.config, 
                    ...action.config
                }
            }
        case actions.setModule:        
            const modulo = state.usuario.Modulos.find(modulo => modulo.nome === action.nome);            
            const newState1 = {
                ...state,
                conteudo: modulo.conteudo,
                menus: modulo.Menus,
                modulo: action.nome,
                titulo: modulo.titulo
            };
            pushHistory(newState1);
            return newState1;
        case actions.resetToken:
            pushHistory(state);
            return {
                ...initialState,
                toasts: [
                    {
                        titulo: "Usuário desconectado",
                        conteudo: "Feche a janela do navegador para sair com segurança.",
                        toastKey: 1
                    }
                ],
                toastKey: 2
            };
        case actions.setContent:
            const newState2 = {
                ...state,
                conteudo: action.conteudo,
                props: action.props,
                titulo: action.titulo? action.titulo : state.titulo,
                menus: action.fullpage? [] : [...state.menus]
            }
            pushHistory(newState2);
            return newState2;
        case actions.setTitle:
            return {
                ...state,
                titulo: action.titulo,
            }
        case actions.openModal:
            return {
                ...state,
                modal: {
                    ...initialState.modal,
                    show: true,
                    ...action.modal
                }
            }
        case actions.closeModal:
            return {
                ...state,
                modal: initialState.modal
            }
        default:
            return state;
    }
}

const store = createStore(reducer);

store.subscribe(() => {
    saveState(store.getState());
})

window.addEventListener('popstate', ({state}) => {
    store.dispatch({type: actions.setState, state});
});

export default store;