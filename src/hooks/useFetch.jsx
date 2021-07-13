import { apiActions } from "@modules/api/actions"
import camelcase from "camelcase"
import { useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

const apiSelector = state => state.api

const useFetch = (endpoint) => {
    const dispatch = useDispatch()
    const apiState = useSelector(apiSelector)

    const performFetch = useCallback((data, subpages) => dispatch(apiActions.fetch(endpoint, {subpages, data})), [endpoint, dispatch])
    const clearFetch = useCallback(() => dispatch(apiActions.clear(endpoint)), [endpoint, dispatch])
    const response = useMemo(() => apiState[camelcase(endpoint)], [endpoint, apiState])

    return {response, performFetch, clearFetch}
}

export default useFetch;