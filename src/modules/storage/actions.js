export const SET_ME = "SET_ME"
export const UNSET_ME = "UNSET_ME"

export const storageActions = {
    setMe: (username) => ({
        type: SET_ME,
        payload: {username}
    }),

    unsetMe: () => ({
        type: UNSET_ME,
        payload: null
    })
}