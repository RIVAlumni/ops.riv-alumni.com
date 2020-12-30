import { BehaviorSubject } from 'rxjs';
import { Dispatch, SetStateAction, createContext } from 'react';

import { Member, Participation } from '../../models';

interface StateContext {
  data: Array<Member & Participation>;
  setData: Dispatch<SetStateAction<(Member & Participation)[]>>;
}

const onSearch$ = new BehaviorSubject<number>(0);
const StateContext = createContext({} as StateContext);

export { StateContext, onSearch$ };
