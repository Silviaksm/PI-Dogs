const initialState = {
    dogs: [],
    allDog: [],
    temperaments: [],
    detail: [],
}


function rootReducer(state = initialState, action) {
    switch (action.type) {

        case 'GET_ALL_DOGS':
    
            return {
                ...state,
                dogs: action.payload,
                allDog: action.payload,
            }

        case 'GET_BY_NAME':
            return {
                ...state,
                dogs: action.payload,
            }

        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload
            };

        case 'FILTER_TEMPER':
        
            const dogsState = state.allDog;
            
            const temperamentsFilter = dogsState.filter((e) => {
                
                console.log(e)
                return e.temperaments.includes(action.payload) 
                
            })
            return {
                ...state,
                dogs: [...temperamentsFilter]

            };

        case 'POST_DOG':
            return {
                ...state,
            }

        case 'ORDER_BY_NAME':
            
            const byName = action.payload === "acs" ? state.dogs.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return 1
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return -1
                }
                return 0;
            }) : state.dogs.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                    return -1
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                    return 1
                }
                return 0;
            })
            
            return {
                ...state,
                dogs: byName,
            };

        case 'ORDER_BY_WEIGHT':

            let sortWeight = action.payload === 'weight_min' ?
                state.dogs.sort(function (a, b) {
                    return a.weight_min - b.weight_min;
                }) :
                state.dogs.sort(function (a, b) {
                    return b.weight_min - a.weight_min;
                })
            return {
                ...state,
                dogs: sortWeight
            };

        case 'FILTER_BREED':
            const allDogs= state.allDog;
           
            if(action.payload==="created"){
                var filterCreated = allDogs.filter(el => el.createdInDb)
            }else{
                 filterCreated = allDogs.filter(el => !el.createdInDb)
            }
            
            return {
                ...state,
                dogs: action.payload === "all" ? allDogs : filterCreated
            }

         case "GET_CLEAN":
                return {
                    ...state,
                    detail: action.payload
                };











        default:
            return state;
    }
}

export default rootReducer;