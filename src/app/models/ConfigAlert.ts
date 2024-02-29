import { HttpStatusCode } from "@angular/common/http";

export interface ConfigAlert {
    msg : string,
    status : HttpStatusCode,
    state: "error" | "success"
  }