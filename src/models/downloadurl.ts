export interface downloadurl  {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  peak: number;
  fee: number;
  uf: object;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialInfo: object;
  level: string;
  encodeType: string;
  freeTrialPrivilege: {
    resConsumable: boolean;
    userConsumable: boolean;
    listenType: object;
    cannotListenReason: object;
  };
  freeTimeTrialPrivilege: {
    resConsumable: boolean;
    userConsumable: boolean;
    type: number;
    remainTime: number;
  };
  urlSource: number;
  rightSource: number;
  podcastCtrp: object;
  effectTypes: object;
  time: number;
};
