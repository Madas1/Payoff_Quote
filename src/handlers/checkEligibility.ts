import moment from "moment";
import {
	IAccountInformationProcess,
	IAccountInformation,
	iEligibilityStatus,
	EprocessStatus,
	EterminationType,
	EreposessionStatus,
	EBankruptcyStatus,
	ECountryType,
	EStateType,
	EAccountType,
	ETerminationStatus,
	EAccountStatus
} from "../models";
import { canadianEligbility, usEligibility, checkEligibleForPayoffQuote, checkOnlinePayoffEligibility, checkpayOffByMailEligibility } from "./EligibilityMethods";

export class accountInformationProcess implements IAccountInformationProcess {
	private elgibilityStatus: iEligibilityStatus;

	private accountInformation: IAccountInformation;

	constructor(accountInformation: IAccountInformation) {
		Object.keys(accountInformation).map(key => (this.accountInformation[key] = accountInformation[key]));

		this.checkEligibleForPayoffQuote = this.checkEligibleForPayoffQuote.bind(this);
		this.checkOnlinePayoffEligibility = this.checkOnlinePayoffEligibility.bind(this);

		if (this.accountInformation.isOpen) {
			this.accountInformation.editable =
				(this.accountInformation.processStatus === EprocessStatus.completed ||
					this.accountInformation.processStatus === EprocessStatus.pending) &&
				this.accountInformation.terminationType === EterminationType.terminationByPayoff;
			this.accountInformation.disabled =
				this.accountInformation.isOpen &&
				(this.accountInformation.reposessionStatus === EreposessionStatus.reposessed ||
					(this.accountInformation.processStatus === EprocessStatus.completed ||
						this.accountInformation.processStatus === EprocessStatus.pending) ||
					this.accountInformation.daysDelinquent > 69 ||
					this.accountInformation.bankruptcyStatus === EBankruptcyStatus.bankrupt);
			this.accountInformation.editable =
				this.accountInformation.terminationStatus === ETerminationStatus.T &&
				this.accountInformation.dueAumount === 0 &&
				moment(this.accountInformation.lastEdited).add(45, "days") <= moment();
		}
		if (!this.accountInformation.isOpen) {
			let date = new Date().getDate();
			this.accountInformation.editable =
				(this.accountInformation.accountStatus === EAccountStatus.paidoff ||
					this.accountInformation.accountStatus === EAccountStatus.closed) &&
				moment(this.accountInformation.lastEdited).add(45, "days") <= moment();
		}
	}

	checkEligibleForPayoffQuote(): boolean {
		let { eligibleForPayoffQuote } = this.elgibilityStatus;

		eligibleForPayoffQuote = checkEligibleForPayoffQuote(eligibleForPayoffQuote, this.accountInformation);
		
        return eligibleForPayoffQuote;
	}

	checkOnlinePayoffEligibility(): boolean {
	
		let { eligibleonlinePayoff } = this.elgibilityStatus;


		return checkOnlinePayoffEligibility(eligibleonlinePayoff, this.accountInformation);
	}

	checkpayOffByMailEligibility(): boolean {
		let { eligbilepayOffByMail } = this.elgibilityStatus;

		return checkpayOffByMailEligibility(eligbilepayOffByMail, this.accountInformation);
	}

	public get EligiblityStatus(): any {
		this.checkEligibleForPayoffQuote();
		this.checkOnlinePayoffEligibility();
		this.checkpayOffByMailEligibility()
		return this.elgibilityStatus;
	}

	public get getAccountDetails(): any {
		return this.accountInformation;
	}

	public set updateAccountInformation({ value, detail }) {
		this.accountInformation[detail] = value;
	}

	public set updateEligiblityStatus({ value, detail }) {
		this.elgibilityStatus[detail] = value;
	}
}
