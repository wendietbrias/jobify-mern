const reedemCode = "AaBbCcDdEeFfGgHhJ23jK4k4L5lMmNnOoPpQq1a2b10Rr8Ss6";

const confirmationCode = () => {
    let codes = [];
  
    for(let i  = 0; i < 12; i++) {
        codes.push(reedemCode[Math.floor(Math.random() * reedemCode.length)]);
    }
    
    return codes.join(" ");
}

export default confirmationCode;