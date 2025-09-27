


console.log("Welcome to Hotel Booking And Management App");

const roomList = [{RoomName:"Single",Bed: 1,RestRoom: 1 ,Capacity:"1-2",PerHour: 50,Promo12hrs: 500,Promo24hrs:1100},
                  {RoomName:"Double",Bed: 2,RestRoom: 1 ,Capacity:"2-4",PerHour: 70,Promo12hrs: 700,Promo24hrs:1300},
                  {RoomName:"Family",Bed: 2,RestRoom: 2 ,Capacity:"4-6",PerHour: 90,Promo12hrs: 950,Promo24hrs:1800},
                 ];

function RoomDetails(){
    console.log("List of Room & Informations");
    console.table(roomList);
}
const bookedHistory = [];

const userAdmin = "Administrator"
const userName = [{UserName:"qwe"},];
let roomBooked;

let createdUserName; //
let accountRegstered;
let loginUserName;
let adminLogin;
let napilingRoom;

let addhowManyHours;
let promoDose;
let promoTwentyFour;
let checkInSet = {Set_CheckIn:"Check-In Details",Month:"",Day:0,Time:0,AM_PM:""};

let howManyHours;
let addedHours;

const listMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const currentDate = new Date();
const getcurrentMonth = currentDate.getMonth();
const currentMonthday = currentDate.getDate();


function mainMenu(){
    console.log("\nMain Menu:");
    console.log("1.Login\n2.Signup\n3.Guest\nGuest Shows the Rooms and info");

    const menuSeleced = prompt("Select by Using Number:");
    if(menuSeleced === "1"){
        selectLogin();
    }
    else if(menuSeleced === "2"){
        selectSignup();
    }
    else if(menuSeleced === "3"){
        selectGuest();
    }
    else if(menuSeleced === null){
        console.log("Thank you for Visiting our Website");
    }
    else{
        alert("can't Find Menu Selected!");
        mainMenu();
    }
}
setTimeout(mainMenu,4000);

function selectLogin(){
    console.log("Selected 1. Login");
    console.log("1. Login as User\n2. Login as Admin");
    let selectLoginOpt = prompt("Enter login Type:");

    if(selectLoginOpt === "1"){
        loginUser();
    }
    else if(selectLoginOpt === "2"){
        loginAdmin();
    }
    else if(selectLoginOpt === null){
        mainMenu();
    }
    else{
        alert("Login type Not Found");
        selectLogin();
    }
}

function selectSignup(){
    console.log("Selected 2. Signup");
    createdUserName = prompt("Enter a UserName to create an Account");
    //
    let trimCreatedUsername = createdUserName;

    if(createdUserName === null){
        console.log("Cancelled");
        mainMenu();
    }
    else if(trimCreatedUsername.trim()==""){
        alert("Empty");
        selectSignup();
    }
    else{
        createdUserName = {UserName: createdUserName}
        let createdFound = createdUserName.UserName;
        createdFound = userName.find(createdUserName => createdUserName.UserName === createdFound)
        if(createdFound){
            alert("username is taken");
            selectSignup();
        }
        else{
            userName.unshift(createdUserName);
            alert("New UserName Created Successfully!");
            console.log("Return to Main Menu");
            mainMenu();
        }
    }
}

function selectGuest(){
    console.log("Selected 3. Guest\nReturn to MainMenu in 3seconds.");
    RoomDetails();
    setTimeout(mainMenu,3000);
}

// ----------------------------------------- User Function ----------------------------------------//

function loginUser(){

    loginUserName = prompt("Enter your UserName:");

    let loginUserNametrim = loginUserName;
    accountRegstered = userName.find(createdUserName => createdUserName.UserName === loginUserName);

    if(loginUserNametrim === null){
        console.log("Cancelled:");
        mainMenu();
    }
    else if(loginUserNametrim.trim()==""){
        alert("Empty");
        loginUser();
    }
    else if(accountRegstered){
        console.log(`\nWelcome ${accountRegstered.UserName} you May Book a Room now!`); // Booking Function here
        userMenu();
    }
    else{
        alert("Login Username not Found!");
        loginUser();
    }
}

function userMenu(){
    console.log("Menu:");
    console.log("1. My Book History");
    console.log("2. Book now");

    let menuSelected = prompt("Select Menu");
    let menuSelectedTrim = menuSelected;
    menuSelected = Number(menuSelected);

    if(menuSelectedTrim === null){
        alert("Cancelled!");
        loginUser();
    }
    else if(menuSelectedTrim.trim()==""){
        alert("Empty!");
        userMenu();
    }
    else if(menuSelected !== Number(menuSelected)){
        alert("input Number in menu");
        userMenu();
    }
    else if(menuSelected < 1 || menuSelected > 2){
        alert("Not Found in Menu");
    }
    else if(menuSelected === 2){
        pilikanaRoomMo();
    }   
    else{
        let currentUser = loginUserName;
        const foundCurrentUser = bookedHistory.filter(accountRegstered => accountRegstered.UserName === currentUser); // FILTER ALL the users Booked
        console.log(`${loginUserName} This is your Booked History,\nif this is Empty it means you haven't Booked A room`)
        console.table(foundCurrentUser);
        userMenu();
    }
}

function pilikanaRoomMo(){
    RoomDetails();
    console.log("Select a Room to Book :");

    let piliAkoRoom = prompt("Pili ka room gamit Index");
    let piliAkoRoomTrim = piliAkoRoom;
    piliAkoRoom = Number(piliAkoRoom);
    napilingRoom  = roomList[piliAkoRoom];
    
    if(piliAkoRoomTrim === null){
        alert("Pili Room Cancelled!");
        loginUser();
    }
    else if(piliAkoRoomTrim.trim()===""){
        alert("Empty");
        pilikanaRoomMo();
    }
    else if(piliAkoRoom !== Number(piliAkoRoom)){
        alert("Pili ka Gamit number or index ng room");
        pilikanaRoomMo();
    }
    else if(napilingRoom){
        roomBooked = {UserName:accountRegstered.UserName,RoomName: napilingRoom.RoomName, Bed: napilingRoom.Bed, RestRoom: napilingRoom.RestRoom, Capacity: napilingRoom.Capacity}
        console.table(roomBooked);
        piliperOrasOpromo();
    }
    else{
        alert("wala sa Listahan ang pinili mo");
        pilikanaRoomMo();
    }
}

function piliperOrasOpromo(){

    console.log("Select Room rate: Prom or Per Hour.");
    const proMoHourly = ["1. PerHour","2. Promo"];
    
    for(let i = 0; i < proMoHourly.length ; i++){
        console.log(proMoHourly[i]);
    }

    let roomRates = prompt("Select Room Rates");
    let roomRatestrim = roomRates; //get rid of trim and null  errors
    roomRates = Number(roomRates);
    const perHour = {RoomRates:"PerHour"};
    const proMo = {RoomRates:"Promo"};

    const perHourroomBooked = {...roomBooked,...perHour};
    const proMoroomBooked = {...roomBooked,...proMo};

    if(roomRatestrim === null){
        alert("cancelled");
        pilikanaRoomMo();
    }
    else if(roomRatestrim.trim()==""){
        alert("Empty");
        piliperOrasOpromo();
    }
    else if(roomRates !== Number(roomRates)){
        alert("Enter Digits only");
        piliperOrasOpromo();
    }
    else if(roomRates === 1){
        console.table(perHourroomBooked);
        perHourIlangOras();
    }
    else if(roomRates === 2){
        console.table(proMoroomBooked);
        piliPromo();
    }
    else{
        alert("Selected Not Found!");
        piliperOrasOpromo();
    }


    function perHourIlangOras(){
        console.log("Our Hourly Rates has a maximum of 11 hours");
        howManyHours = prompt("How Many Hours ?");
        let howManyHoursTrim = howManyHours;
        howManyHours = Number(howManyHours);
        addedHours ={Room_Hours:howManyHours};

        addhowManyHours = {...roomBooked,...perHourroomBooked,...addedHours};

        if(howManyHoursTrim === null){
            alert("cancelled");
            piliperOrasOpromo();
        }
        else if(howManyHoursTrim.trim()==""){
            alert("Empty!");
            perHourIlangOras();
        }
        else if(howManyHours !== Number(howManyHours)){
            alert("Input Number only!");
            perHourIlangOras();
        }
        else if(howManyHours > 11){
            alert("Max is 11hrs in Hourly Rates");
            perHourIlangOras();
        }
        else{
            console.table(addhowManyHours);                            
            checkInRatesOras();

        }
    }

    function piliPromo(){
        const promoSelection = ["1. 12 Hours","2. 24 Hours"];;
        
        for(let i = 0; i < promoSelection.length; i++){
            console.log(promoSelection[i]);
        }

        let selectPromo = prompt("Select Promo");
        let selectPromoTrim = selectPromo;
        selectPromo = Number(selectPromo);
        const promoDeseOras = {Selected_Promo: 12};
        const promoBenteKwatro = {Selected_Promo: 24};

        promoDose = {...roomBooked,...proMoroomBooked,...promoDeseOras};
        promoTwentyFour = {...roomBooked,...proMoroomBooked,...promoBenteKwatro};

        if(selectPromoTrim === null){
            alert("Cancelled");
            piliperOrasOpromo();
        }
        else if(selectPromoTrim.trim()==""){
            alert("Empty!");
            piliPromo();
        }
        else if(selectPromo !== Number(selectPromo)){
            alert("Number Selection!");
            piliPromo();
        }
        else if(selectPromo === 1){
            console.table(promoDose);
            checkInRatesDose();        
        }
        else if(selectPromo === 2){
            console.table(promoTwentyFour);
            checkInRatesBenteKwatro();                             
        }
        else{
            alert("Promo not Found!");
        }
    }


    function checkInRatesOras(){
        
        console.log('Date Selection Reminders\nbook shold be done before check-in Day');
        console.log("Select Date:");
        console.log("Select Check-In Month by Index");

        console.table(listMonth);

        let orasSelectMonth = prompt("Select Month By using number Month Index");
        let orasSelectMonthtrim = orasSelectMonth;
        orasSelectMonth = Number(orasSelectMonth);
        let selectMonth = listMonth[orasSelectMonth];


        if(orasSelectMonthtrim === null){
            alert("cancelled");
            pilikanaRoomMo();
        }
        else if(orasSelectMonthtrim.trim()==""){
            alert("Empty");
            checkInRatesOras();
        }
        else if(orasSelectMonth !== Number(orasSelectMonth)){
            alert("Select using number");
            checkInRatesOras();
        }
        else if(orasSelectMonth > 11){
            alert("Check Index of Months");
            checkInRatesOras()
        }
        else if(orasSelectMonth < getcurrentMonth){
            alert("Previous Month is Not Allowed!");
            checkInRatesOras();
        }
        else{
            checkInSet.Month = selectMonth;
            addhowManyHours = {...addhowManyHours,...checkInSet};
            console.table(addhowManyHours);
            perOrasselectDay();

            function perOrasselectDay(){
                alert("Reminder! check Calendar before Selecting a Day.")
                let selectOrasDay = prompt("Enter Day 1-31");
                let selectOrasDaytrim = selectOrasDay;
                selectOrasDay = Number(selectOrasDay);

                const dayPlus3 = currentDate.getDate() + 3;

                if(selectOrasDaytrim === null){
                    alert("Cancelled");
                    checkInRatesOras();
                }
                else if(selectOrasDaytrim.trim()==""){
                    alert("Empty");
                    perOrasselectDay();
                }
                else if(selectOrasDay > 31){
                    alert("Day 1-31");
                    perOrasselectDay();
                }
                else if(orasSelectMonth === getcurrentMonth){
                    if(selectOrasDay < currentMonthday){
                        alert(" Previous Days Invalid");
                        perOrasselectDay();
                    }
                    else if(selectOrasDay < dayPlus3){
                        alert("Booking a Room must be atleast 3-Days Before Check-in Day!");
                        perOrasselectDay();
                    }
                    else{
                        checkInSet.Day = selectOrasDay;
                        addhowManyHours = {...addhowManyHours,...checkInSet};
                        console.table(addhowManyHours);
                        perOrasselectDayOras();
                    }
                }
                else{
                    checkInSet.Day = selectOrasDay;
                    addhowManyHours = {...addhowManyHours,...checkInSet};
                    console.table(addhowManyHours);
                    perOrasselectDayOras();
                }
            }

            function perOrasselectDayOras(){
                console.log("Select Time:");

                let selectOrasOras = prompt("Select Time:");
                let selectOrasOrasTrim = selectOrasOras;
                selectOrasOras = Number(selectOrasOras);

                if(selectOrasOrasTrim === null){
                    alert("cancelled!");
                    perOrasselectDay();
                }
                else if(selectOrasOrasTrim.trim()==""){
                    alert("Empty");
                    perOrasselectDayOras();
                }
                else if(selectOrasOras !== Number(selectOrasOras)){
                    alert("Input Numbers ONly");
                    perOrasselectDayOras();
                }
                else if(selectOrasOras > 12 || selectOrasOras < 1){
                    alert("1-12 only");
                    perOrasselectDayOras();
                }
                else{
                    checkInSet.Time = selectOrasOras;
                    addhowManyHours = {...addhowManyHours,...checkInSet};
                    console.table(addhowManyHours);
                    perOrasselectDayOrasAMPM();
                }
            }

            function perOrasselectDayOrasAMPM(){
                
                let selectOrasOrasAMPM = prompt("Input : am or pm");
                let selectOrasOrasAMPMtrim = selectOrasOrasAMPM;

                if(selectOrasOrasAMPMtrim === null){
                    alert("Cancelled!");
                    perOrasselectDayOras();
                }
                else if(selectOrasOrasAMPMtrim.trim()==""){
                    alert("Empty");
                    perOrasselectDayOrasAMPM();
                }
                else if(selectOrasOrasAMPM == "am" || selectOrasOrasAMPM == "pm"){
                    checkInSet.AM_PM = selectOrasOrasAMPM;
                    addhowManyHours = {...addhowManyHours,...checkInSet};
                    console.table(addhowManyHours);
                    
                    console.log("\n-----Booking Details-----");
                    alert("Please Double Check the Details:");
                    console.log("Ok to Startover and Choose Different Rom\nCancel to Proceed to Payment");
                    const confirmBookDetails = confirm("Would you like to startover?");

                    if(confirmBookDetails){
                        roomBooked = {UserName:accountRegstered.UserName,RoomName: "", Bed: 0, RestRoom: 0, Capacity: 0}
                        checkInSet = {Set_CheckIn:"Check-In Details",Month:"",Day:0,Time:0,AM_PM:""};
                        console.log("\nSelected OK = Start Over:")
                        pilikanaRoomMo();
                    }
                    else{
                        const totalOras = howManyHours *  napilingRoom.PerHour;
                        console.log(`The Room you Selected is: ${napilingRoom.RoomName} and choose Promo 12 Hours :
                        \nTotal Cost: ${totalOras}`);                                                                                       //here
                        let withpaymentOras = {Per_Hour_Cost: totalOras};
                        withpaymentOras = {...addhowManyHours,...checkInSet,...withpaymentOras};
                        console.table(withpaymentOras);
                        enterAmountTopayOras();

                        function enterAmountTopayOras(){
                            let bayadSaKwartoOras = prompt("Enter Amount To Pay");
                            let bayadSaKwartoOrastrim = bayadSaKwartoOras;
                            bayadSaKwartoOras = Number(bayadSaKwartoOras);

                            if(bayadSaKwartoOrastrim === null){
                                alert("Cancelled!\nrturn to choose Promo or Per Hours");
                                piliperOrasOpromo();
                            }
                            else if(bayadSaKwartoOrastrim.trim()===""){
                                alert("Empty");
                                enterAmountTopayOras();
                            }
                            else if(bayadSaKwartoOras < totalOras){
                                alert("insufficient! Please Enter Exact Cost.");
                                enterAmountTopayOras();
                            }
                            else if(bayadSaKwartoOras > totalOras){
                                alert("exceeds the totall Cost:  Please Enter Exact Cost.");
                            }
                            else if(bayadSaKwartoOras !== Number(bayadSaKwartoOras)){
                                alert("Enter Number only");
                                enterAmountTopayOras();
                            }
                            else{
                                let roomPaidOras = {Room_Reservation: "Paid"};
                                roomPaidOras = {...withpaymentOras,...roomPaidOras};
                                console.log("your Room is Booked!\nThank you for Booking!");
                                console.table(roomPaidOras);
                                bookedHistory.push(roomPaidOras);

                                const bookMore = confirm("Would you Like to Book more?");

                                if(bookMore){
                                    roomBooked = {UserName:accountRegstered.UserName,RoomName: "", Bed: 0, RestRoom: 0, Capacity: 0}
                                    checkInSet = {Set_CheckIn:"Check-In Details",Month:"",Day:0,Time:0,AM_PM:""};
                                    pilikanaRoomMo();

                                }
                                else{   
                                    mainMenu();
                                }
                            }
                        }
                    }
                }
                else{
                    alert("invalid! am or pm only.");
                    perOrasselectDayOrasAMPM();
                }
            }
        }
    }

    function checkInRatesDose(){
        console.log('Date Selection Reminders\nbook shold be done before check-in Day');
        console.log("Select Date:");
        console.log("Select Check-In Month by Index");

        console.table(listMonth);

        let doseSelectMonth = prompt("Select Month By using number Month Index");
        let doseSelectMonthtrim = doseSelectMonth;
        doseSelectMonth = Number(doseSelectMonth);
        let selectMonth = listMonth[doseSelectMonth];


        if(doseSelectMonthtrim === null){
            alert("cancelled");
            pilikanaRoomMo();
        }
        else if(doseSelectMonthtrim.trim()==""){
            alert("Empty");
            checkInRatesDose();
        }
        else if(doseSelectMonth !== Number(doseSelectMonth)){
            alert("Select using number");
            checkInRatesDose();
        }
        else if(doseSelectMonth > 11){
            alert("Check Index of Months");
            checkInRatesDose()
        }
        else if(doseSelectMonth < getcurrentMonth){
            alert("Previous Month is Not Allowed!");
            checkInRatesDose();
        }
        else{
            checkInSet.Month = selectMonth;
            promoDose = {...promoDose,...checkInSet};
            console.table(promoDose);
            doseselectDay();

            function doseselectDay(){
                alert("Reminder! check Calendar before Selecting a Day.")
                let selectDoseDay = prompt("Enter Day 1-31");
                let selectDoseDaytrim = selectDoseDay;
                selectDoseDay = Number(selectDoseDay);

                const dayPlus3 = currentDate.getDate() + 3;

                if(selectDoseDaytrim === null){
                    alert("Cancelled");
                    checkInRatesDose();
                }
                else if(selectDoseDaytrim.trim()==""){
                    alert("Empty");
                    doseselectDay();
                }
                else if(selectDoseDay > 31){
                    alert("Day 1-31");
                    doseselectDay();
                }
                else if(doseSelectMonth === getcurrentMonth){
                    if(selectDoseDay < currentMonthday){
                        alert(" Previous Days Invalid");
                        doseselectDay();
                    }
                    else if(selectDoseDay < dayPlus3){
                        alert("Booking a Room must be atleast 3-Days Before Check-in Day!");
                        doseselectDay();
                    }
                    else{
                        checkInSet.Day = selectDoseDay;
                        promoDose = {...promoDose,...checkInSet};
                        console.table(promoDose);
                        doseselectDayOras();
                    }
                }
                else{
                    checkInSet.Day = selectDoseDay;
                    promoDose = {...promoDose,...checkInSet};
                    console.table(promoDose);
                    doseselectDayOras();
                }
            }

            function doseselectDayOras(){
                console.log("Select Time:");

                let selectDoseOras = prompt("Select Time:");
                let selectDoseOrasTrim = selectDoseOras;
                selectDoseOras = Number(selectDoseOras);

                if(selectDoseOrasTrim === null){
                    alert("cancelled!");
                    doseselectDay();
                }
                else if(selectDoseOrasTrim.trim()==""){
                    alert("Empty");
                    doseselectDayOras();
                }
                else if(selectDoseOras !== Number(selectDoseOras)){
                    alert("Input Numbers ONly");
                    doseselectDayOras();
                }
                else if(selectDoseOras > 12 || selectDoseOras < 1){
                    alert("1-12 only");
                    doseselectDayOras();
                }
                else{
                    checkInSet.Time = selectDoseOras;
                    promoDose = {...promoDose,...checkInSet};
                    console.table(promoDose);
                    doseselectDayOrasAMPM();
                }
            }

            function doseselectDayOrasAMPM(){
                
                let selectDoseOrasAMPM = prompt("Input : am or pm");
                let selectDoseOrasAMPMtrim = selectDoseOrasAMPM;

                if(selectDoseOrasAMPMtrim === null){
                    alert("Cancelled!");
                    doseselectDayOrasAMPM();
                }
                else if(selectDoseOrasAMPMtrim.trim()==""){
                    alert("Empty");
                    doseselectDayOrasAMPM();
                }
                else if(selectDoseOrasAMPM == "am" || selectDoseOrasAMPM == "pm"){
                    checkInSet.AM_PM = selectDoseOrasAMPM;
                    promoDose = {...promoDose,...checkInSet};
                    console.table(promoDose);
                    
                    console.log("\n-----Booking Details-----");
                    alert("Please Double Check the Details:");
                    console.log("Ok to Startover and Choose Different Rom\nCancel to Proceed to Payment");
                    const confirmBookDetails12 = confirm("Would you like to startover?");

                    if(confirmBookDetails12){
                        roomBooked = {UserName:accountRegstered.UserName,RoomName: "", Bed: 0, RestRoom: 0, Capacity: ""}
                        checkInSet = {Set_CheckIn:"Check-In Details",Month:"",Day:0,Time:0,AM_PM:""};
                        console.log("\nSelected OK = Start Over:")
                        pilikanaRoomMo();
                    }
                    else{
                        console.log(`The Room you Selected is: ${napilingRoom.RoomName} and choose Promo 12 Hours :
                        \nTotal Cost: ${napilingRoom.Promo12hrs}`);
                        let withPayment12 = {Promo_Cost: napilingRoom.Promo12hrs}
                        withPayment12 ={...promoDose,...checkInSet,...withPayment12};
                        console.table(withPayment12);
                        enterAmountTopay12();
                                                                                                                                                           ///here
                        function enterAmountTopay12(){
                            let bayadSaKwarto12 = prompt("Enter Amount To Pay");
                            let bayadSaKwarto12trim = bayadSaKwarto12;
                            bayadSaKwarto12 = Number(bayadSaKwarto12);

                            if(bayadSaKwarto12trim === null){
                                alert("Cancelled!\nrturn to choose Promo or Per Hours");
                                piliperOrasOpromo();
                            }
                            else if(bayadSaKwarto12trim.trim()===""){
                                alert("Empty");
                                enterAmountTopay12();
                            }
                            else if(bayadSaKwarto12 < napilingRoom.Promo12hrs){
                                alert("insufficient! Please Enter Exact Cost.");
                                enterAmountTopay12();
                            }
                            else if(bayadSaKwarto12 > napilingRoom.Promo12hrs){
                                alert("exceeds the totall Cost:  Please Enter Exact Cost.");
                            }
                            else if(bayadSaKwarto12 !== Number(bayadSaKwarto12)){
                                alert("Enter Number only");
                                enterAmountTopay12();
                            }
                            else{
                                let roomPaid12hrs = {Room_Reservation: "Paid"};
                                roomPaid12hrs = {...withPayment12,...roomPaid12hrs};
                                console.log("your Room is Booked!\nThank you for Booking!");
                                console.table(roomPaid12hrs);
                                bookedHistory.push(roomPaid12hrs);

                                const bookMore = confirm("Would you Like to Book more?");

                                if(bookMore){
                                    roomBooked = {UserName:accountRegstered.UserName,RoomName: "", Bed: 0, RestRoom: 0, Capacity: 0}
                                    checkInSet = {Set_CheckIn:"Check-In Details",Month:"",Day:0,Time:0,AM_PM:""};
                                    pilikanaRoomMo();

                                }
                                else{
                                    mainMenu();
                                }
                            }
                        }
                    }
                }
                else{
                    alert("invalid! am or pm only.");
                    doseselectDayOrasAMPM();
                }
            }
        }
    }

    function checkInRatesBenteKwatro(){
        console.log('Date Selection Reminders\nbook shold be done before check-in Day');
        console.log("Select Date:");
        console.log("Select Check-In Month by Index");

        console.table(listMonth);

        let benteKwatroSelectMonth = prompt("Select Month By using number Month Index");
        let benteKwatroSelectMonthtrim = benteKwatroSelectMonth;
        benteKwatroSelectMonth = Number(benteKwatroSelectMonth);
        let selectMonth = listMonth[benteKwatroSelectMonth];


        if(benteKwatroSelectMonthtrim === null){
            alert("cancelled");
            pilikanaRoomMo();
        }
        else if(benteKwatroSelectMonthtrim.trim()==""){
            alert("Empty");
            checkInRatesBenteKwatro();
        }
        else if(benteKwatroSelectMonth !== Number(benteKwatroSelectMonth)){
            alert("Select using number");
            checkInRatesBenteKwatro();
        }
        else if(benteKwatroSelectMonth > 11){
            alert("Check Index of Months");
            checkInRatesBenteKwatro()
        }
        else if(benteKwatroSelectMonth < getcurrentMonth){
            alert("Previous Month is Not Allowed!");
            checkInRatesBenteKwatro();
        }
        else{
            checkInSet.Month = selectMonth;
            promoTwentyFour = {...promoTwentyFour,...checkInSet};
            console.table(promoTwentyFour);
            benteKwatroselectDay();

            function benteKwatroselectDay(){
                alert("Reminder! check Calendar before Selecting a Day.")
                let selectBenteKwatroDay = prompt("Enter Day 1-31");
                let selectBenteDaytrim = selectBenteKwatroDay;
                selectBenteKwatroDay = Number(selectBenteKwatroDay);

                const dayPlus3 = currentDate.getDate() + 3;

                if(selectBenteDaytrim === null){
                    alert("Cancelled");
                    checkInRatesBenteKwatro();
                }
                else if(selectBenteDaytrim.trim()==""){
                    alert("Empty");
                    benteKwatroselectDay();
                }
                else if(selectBenteKwatroDay > 31){
                    alert("Day 1-31");
                    benteKwatroselectDay();
                }
                else if(benteKwatroSelectMonth === getcurrentMonth){
                    if(selectBenteKwatroDay < currentMonthday){
                        alert(" Previous Days Invalid");
                        benteKwatroselectDay();
                    }
                    else if(selectBenteKwatroDay < dayPlus3){
                        alert("Booking a Room must be atleast 3-Days Before Check-in Day!");
                        benteKwatroselectDay();
                    }
                    else{
                        checkInSet.Day = selectBenteKwatroDay   ;
                        promoTwentyFour = {...promoTwentyFour,...checkInSet};
                        console.table(promoTwentyFour);
                        benteKwatroselectDayOras();
                    }
                }
                else{
                    checkInSet.Day = selectBenteKwatroDay;
                    promoTwentyFour = {...promoTwentyFour,...checkInSet};
                    console.table(promoTwentyFour);
                    benteKwatroselectDayOras();
                }
            }

            function benteKwatroselectDayOras(){
                console.log("Select Time:");

                let selectBenteKwatroOras = prompt("Select Time:");
                let selectBenteKwatroOrasTrim = selectBenteKwatroOras;
                selectBenteKwatroOras = Number(selectBenteKwatroOras);

                if(selectBenteKwatroOrasTrim === null){
                    alert("cancelled!");
                    doseselectDay();
                }
                else if(selectBenteKwatroOrasTrim.trim()==""){
                    alert("Empty");
                    benteKwatroselectDayOras();
                }
                else if(selectBenteKwatroOras !== Number(selectBenteKwatroOras)){
                    alert("Input Numbers ONly");
                    benteKwatroselectDayOras();
                }
                else if(selectBenteKwatroOras > 12 || selectBenteKwatroOras < 1){
                    alert("1-12 only");
                    benteKwatroselectDayOras();
                }
                else{
                    checkInSet.Time = selectBenteKwatroOras;
                    promoTwentyFour = {...promoTwentyFour,...checkInSet};
                    console.table(promoTwentyFour);
                    bentekwatroselectDayOrasAMPM();
                }
            }

            function bentekwatroselectDayOrasAMPM(){
                
                let selectbenteKwatroOrasAMPM = prompt("Input : am or pm");
                let selectbenteKwatroOrasAMPMtrim = selectbenteKwatroOrasAMPM;

                if(selectbenteKwatroOrasAMPMtrim === null){
                    alert("Cancelled!");
                    bentekwatroselectDayOrasAMPM();
                }
                else if(selectbenteKwatroOrasAMPMtrim.trim()==""){
                    alert("Empty");
                    bentekwatroselectDayOrasAMPM();
                }
                else if(selectbenteKwatroOrasAMPM == "am" || selectbenteKwatroOrasAMPM == "pm"){                                                        
                    checkInSet.AM_PM = selectbenteKwatroOrasAMPM;
                    promoTwentyFour = {...promoTwentyFour,...checkInSet};
                    console.table(promoTwentyFour);

                    console.log("\n-----Booking Details-----");
                    alert("Please Double Check the Details:");
                    console.log("Ok to Startover and Choose Different Rom\nCancel to Proceed to Payment");
                    const confirmBookDetails24 = confirm("Would you like to startover?");                           ///////here

                    if(confirmBookDetails24){
                        roomBooked = {UserName:accountRegstered.UserName,RoomName: "", Bed: 0, RestRoom: 0, Capacity: ""}
                        checkInSet = {Set_CheckIn:"Check-In Details",Month:"",Day:0,Time:0,AM_PM:""};
                        console.log("\nSelected OK = Start Over:")
                        pilikanaRoomMo();
                    }
                    else{
                        console.log(`The Room you Selected is: ${napilingRoom.RoomName} and choose Promo 24 Hours :
                        \nTotal Cost: ${napilingRoom.Promo24hrs}`);
                        let withPayment24 = {Promo_Cost: napilingRoom.Promo24hrs}
                        withPayment24 ={...promoTwentyFour,...checkInSet,...withPayment24};
                        console.table(withPayment24);
                        enterAmountTopay24();

                        function enterAmountTopay24(){
                            let bayadSaKwarto24 = prompt("Enter Amount To Pay");
                        let bayadSaKwarto24trim = bayadSaKwarto24;
                        bayadSaKwarto24 = Number(bayadSaKwarto24);

                        if(bayadSaKwarto24trim === null){
                            alert("Cancelled!\nrturn to choose Promo or Per Hours");
                            piliperOrasOpromo();
                        }
                        else if(bayadSaKwarto24trim.trim()===""){
                            alert("Empty");
                            enterAmountTopay24();
                        }
                        else if(bayadSaKwarto24 < napilingRoom.Promo24hrs){
                            alert("insufficient! Please Enter Exact Cost.");
                            enterAmountTopay24();
                        }
                        else if(bayadSaKwarto24 > napilingRoom.Promo24hrs){
                            alert("exceeds the totall Cost:  Please Enter Exact Cost.");
                        }
                        else if(bayadSaKwarto24 !== Number(bayadSaKwarto24)){
                            alert("Enter Number only");
                            enterAmountTopay24();
                        }
                        else{
                            let roomPaid24hrs = {Room_Reservation: "Paid"};
                            roomPaid24hrs = {...withPayment24,...roomPaid24hrs};
                            console.log("your Room is Booked!\nThank you for Booking!");
                            console.table(roomPaid24hrs);
                            bookedHistory.push(roomPaid24hrs);

                            const bookMore = confirm("Would you Like to Book more?");

                            if(bookMore){
                                roomBooked = {UserName:accountRegstered.UserName,RoomName: "", Bed: 0, RestRoom: 0, Capacity: ""};
                                checkInSet = {Set_CheckIn:"Check-In Details",Month:"",Day:0,Time:0,AM_PM:""};
                                pilikanaRoomMo();
                            }
                            else{
                                mainMenu();
                                }
                            }
                        }
                    }
                }
            else{
                alert("invalid! am or pm only.");
                bentekwatroselectDayOrasAMPM();
                }
            }
        }
    }
}


// ------ Administrator Mode -----//

function loginAdmin(){
    console.log("Login Admin")
    adminLogin = prompt("Enter Admin User");
    let admintrim = adminLogin;;
    
    if(adminLogin === null){
        console.log("Cancelled:");
        selectLogin();
    }
    else if(admintrim.trim()==""){
        alert("Empty!");
        loginAdmin();
    }
    else if(adminLogin !== userAdmin){
        alert("Incorrect");
        loginAdmin();
    }
    else{
        if(adminLogin === userAdmin){
            console.log("\nWelcome Administrator");
            adminFunctions();
        }
    }
}

function adminFunctions(){
    RoomDetails();
    console.log("Admins Function:");
    console.log("1. add/create new Room");
    console.log("2. edit/update room details");
    console.log("3. delete a room");
    console.log("4. View List of Rooms");
    console.log("5. Display Booked History");

    let adminFunction = prompt("Select a Function");
    let adminFuncTrim = adminFunction;
     
    if(adminFunction === null){
        console.log("selecting Function Cancelled!\nReturned to Admin Login");
        loginAdmin();
    }
    else if(adminFuncTrim.trim()==""){
        alert("Empty!");
        adminFunctions();
    }
    else if(adminFunction === "1"){
        addCreateRoom();
    }
    else if(adminFunction === "2"){
        editupdateRoom();
    }
    else if(adminFunction === "3"){
        deleteroomList();
    }
    else if(adminFunction === "4"){
        adminFunctions();
    }
    else if(adminFunction === "5"){
        bookedHistoryDisplay();
    }
    else{   
        alert("Function not Found");
    }
}

function addCreateRoom(){
    console.log("1. add/create new Room");
    let newRoom = {};

    let addRoomName = prompt("Input Room Name:");;
    newRoom.RoomName = addRoomName;
    let trimAddRoomName = addRoomName;
    let foundRoomName =  roomList.RoomName; // found the value of object is taken
    foundRoomName = roomList.find(roomList => roomList.RoomName === addRoomName); // found the value of object is taken

    if(foundRoomName){
        alert("Room Name is taken");
        addCreateRoom();
    }
    else if(addRoomName === null){
        console.log("Creatinng New Room Cancelled!");
        adminFunctions();
    }
    else if(trimAddRoomName.trim()==""){
        alert("Empty");
        addCreateRoom();
    }
    else{
        let addBed = prompt("Input how many Bed:");
        let addBedTrim = addBed; // this is for cancel and empty
        addBed = Number(addBed); // convert to number
        newRoom.Bed = addBed;
        
        if(addBedTrim === null){ //condition cancel
            console.log("Creatinng New Room Cancelled!");
            adminFunctions();
        }
        else if(addBedTrim.trim() === ""){ // condition Empty
            alert("Empty");
            addCreateRoom();
        }
        else if(addBed !== Number(addBed)){ // condition not a Number
            alert("Input Numbes Only");
            addCreateRoom();
        }
        else{
            let addRestRoom = prompt("Input Number of RestRoom");
            let addRestRoomTrim = addRestRoom;
            addRestRoom = Number(addRestRoom);
            newRoom.RestRoom = addRestRoom;

            if(addRestRoomTrim === null){ //condition cancel
                console.log("Creatinng New Room Cancelled!");
                adminFunctions();
            }
            else if(addRestRoomTrim.trim() === ""){ // condition Empty
                alert("Empty");
                addCreateRoom();
            }
            else if(addRestRoom !== Number(addRestRoom)){ // condition not a Number
                alert("Input Numbes Only");
                addCreateRoom();
            }
            else{
                let addCapacity = prompt("Input Room Capacity:");
                let addCapacityTrim = addCapacity;
                newRoom.Capacity = addCapacity;

                if(addCapacityTrim === null){
                    console.log("Creatinng New Room Cancelled!");
                    adminFunctions();
                }
                else if(addCapacityTrim.trim()==""){
                    alert("Empty");
                    addCreateRoom();
                }
                else{
                    let addPerHour = prompt("Input Room Per_Hour");
                    let addPerHourTrim = addPerHour;
                    addPerHour = Number(addPerHour);
                    newRoom.PerHour = addPerHour;

                    if(addPerHourTrim === null){
                        console.log("Creatinng New Room Cancelled!");
                        adminFunctions();
                    }
                    else if(addPerHourTrim.trim() ==""){
                        alert("Empty");
                        addCreateRoom();
                    }
                    else if(addPerHour !== Number(addPerHour)){
                        alert("Input Numbes Only");
                        addCreateRoom();
                    }
                    else{
                        let addPromo12Hrs = prompt("Input 12Hours Promo for this Room");
                        let addPromo12HrsTrim = addPromo12Hrs;
                        addPromo12Hrs = Number(addPromo12Hrs);
                        newRoom.Promo12hrs = addPromo12Hrs;
                        
                        if(addPromo12HrsTrim === null){
                            console.log("Creatinng New Room Cancelled!");
                            adminFunctions();
                        }
                        else if(addPromo12HrsTrim.trim()==""){
                            alert("Empty");
                            addCreateRoom();
                        }
                        else if(addPromo12Hrs !== Number(addPromo12Hrs)){
                            alert("Input Numbes Only");
                            addCreateRoom();
                        }
                        else{
                            let addPromo24Hrs = prompt("Input 24Hours Promo for this Room");
                            let addPromo24HrsTrim = addPromo24Hrs;
                            addPromo24Hrs = Number(addPromo24Hrs);
                            newRoom.Promo24hrs = addPromo24Hrs;
                            
                            if(addPromo24HrsTrim === null){
                                console.log("Creatinng New Room Cancelled!");
                                adminFunctions();
                            }
                            else if(addPromo24HrsTrim.trim()==""){
                                alert("Empty");
                                addCreateRoom();
                            }
                            else if(addPromo24Hrs !== Number(addPromo24Hrs)){
                                alert("Input Numbes Only");
                                addCreateRoom();
                            }
                            else{
                                console.log("Verify Created New Room.");
                                console.table(newRoom);
                                let confirmAdd = confirm("Are you Sure to Add This to RommList ?");
                                
                                if(confirmAdd === null){
                                    console.log("Creatinng New Room Cancelled!");
                                    adminFunctions();
                                }
                                else{
                                    roomList.unshift(newRoom);
                                    RoomDetails();
                                    adminFunctions();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function editupdateRoom(){
    console.log("2. edit/update room details");
    console.log("Select Room to Update/Edit");

    let roomEditSelector = prompt('Select List By Index');
    let roomEditSelectortrim = roomEditSelector;
    roomEditSelector = Number(roomEditSelector);
    let selectEditRoomIndex = roomList[roomEditSelector]; // index finderselector true or false

    if(roomEditSelectortrim === null){
        alert("Edit Room Cancelled");
        adminFunctions();
    }
    else if(roomEditSelectortrim.trim()==""){
        alert("Empty");
        editupdateRoom();
    }
    else if(roomEditSelector !== Number(roomEditSelector)){ // condition not a Number
        alert("Input Numbes Only");
        editupdateRoom();
    }
    else if(selectEditRoomIndex){ // True
        SelecttoEdit();
        function SelecttoEdit(){
            console.log(`\nSelected Room to Edit`)
            console.table(selectEditRoomIndex);
            console.log("Select which one you like to edit");
            console.log("1. Room Name");
            console.log("2. Bed");
            console.log("3. Rest Room");
            console.log("4. Capacity");
            console.log("5. Per Hour");
            console.log("6. Promo 12Hours");
            console.log("7. Promo 24Hours");

            let selectToEdit = prompt("Select a Number you want to Edit");
            let selectToEditTrim = selectToEdit;

            if(selectToEditTrim === null){
                alert("Cancelled");
                editupdateRoom();
            }
            else if(selectToEditTrim.trim()==""){
                alert("Empty");
                SelecttoEdit();
            }
            else if(selectToEditTrim === "1"){
                changeRoomNameFunction();

                function changeRoomNameFunction(){
                    console.log("1. Edit Room Name");
                    let changeRoomName = prompt ("Change new Name");
                    let changeRoomNameTrim = changeRoomName;
                    
                    if(changeRoomNameTrim === null){
                        alert("Cancelled");
                        SelecttoEdit();
                    }
                    else if(changeRoomNameTrim.trim() == ""){
                        alert("Empty");
                        changeRoomNameFunction();
                    }
                    else{
                        selectEditRoomIndex.RoomName = changeRoomName;
                        console.log("Room Name Updated!");
                        console.table(selectEditRoomIndex);
                        adminFunctions();
                    }
                }
            }
            else if(selectToEditTrim === "2"){
                changeBedcount();

                function changeBedcount(){
                    console.log("2.Edit Bed Rooom Count ");

                    let changeBed = prompt ("Enter Bed Count");
                    let changeBedTrim = changeBed;
                    changeBed = Number(changeBed);

                    if(changeBedTrim === null){
                        alert("Cancelled");
                        SelecttoEdit();
                    }
                    else if(changeBedTrim.trim()==""){
                        alert("Empty");
                        changeBedcount();
                    }
                    else if(changeBed !== Number(changeBed)){
                        alert("Input number Only");
                        changeBedcount();
                    }
                    else{
                        selectEditRoomIndex.Bed = changeBed;
                        console.log("Bed Room Count Updated!");
                        console.table(selectEditRoomIndex);
                        adminFunctions();
                    }
                }
            }
            else if(selectToEditTrim === "3"){
                changerestRoom();

                function changerestRoom(){
                    console.log("3.Edit Rest Room Count");

                    let changeRestRoom = prompt ("Enter Bed Count");
                    let changeRestRoomTrim = changeRestRoom;
                    changeRestRoom = Number(changeRestRoom);

                    if(changeRestRoomTrim === null){
                        alert("Cancelled");
                        SelecttoEdit();
                    }
                    else if(changeRestRoomTrim.trim()==""){
                        alert("Empty");
                        changerestRoom();
                    }
                    else if(changeRestRoom !== Number(changeRestRoom)){
                        alert("Input number Only");
                        changerestRoom();
                    }
                    else{
                        selectEditRoomIndex.RestRoom = changeRestRoom;
                        console.log("Rest Room Count Updated!");
                        console.table(selectEditRoomIndex);
                        adminFunctions();
                    }
                }
            }
            else if(selectToEditTrim === "4"){
                changeroomCapacity();
                
                function changeroomCapacity(){
                    console.log("4. Edit Room Capacity");

                    let changeRoomCapacity = prompt("Enter Room Capacity");
                    let changeRoomCapacityTrim = changeRoomCapacity;

                    if(changeRoomCapacityTrim === null){
                        alert("Cancelled");
                        SelecttoEdit();
                    }
                    else if(changeRoomCapacityTrim.trim()==""){
                        alert("Empty");
                        changeroomCapacity();
                    }
                    else{
                        selectEditRoomIndex.Capacity = changeRoomCapacity;
                        console.log("Room Capacity Updated");
                        console.table(selectEditRoomIndex);
                        adminFunctions();
                    }
                }
            }
            else if(selectToEditTrim === "5"){
                changeroomperHour();

                function changeroomperHour(){
                    console.log("5. Change Room Per Hour");

                    let changePerHuour = prompt("Enter Hour Rates");
                    let changePerHuourTrim = changePerHuour;
                    changePerHuour = Number(changePerHuour);

                    if(changePerHuourTrim === null){
                        alert("cancelled");
                        SelecttoEdit();
                    }
                    else if(changePerHuourTrim.trim()==""){
                        alert("Empty");
                        changeroomperHour();
                    }
                    else if(changePerHuour !== Number(changePerHuour)){
                        alert("Input Number Only");
                         changeroomperHour();
                    }
                    else{
                        selectEditRoomIndex.PerHour = changePerHuour;
                        console.log("Hourly Rates Updated!");
                        console.table(selectEditRoomIndex);
                        adminFunctions();
                    }
                }
            }
            else if(selectToEditTrim === "6"){
                changepromo12Hrs()

                function changepromo12Hrs(){
                    console.log("6. Change 12Hours Promo");

                    let changePromo12Hrs = prompt("Enter new 12 hours Promo");
                    let changePromo12HrsTrim = changePromo12Hrs;
                    changePromo12Hrs = Number(changePromo12Hrs);

                    if(changePromo12HrsTrim === null){
                        alert("Cancelled!");
                        SelecttoEdit();
                    }
                    else if(changePromo12HrsTrim.trim()==""){
                        alert("Empty");
                        changepromo12Hrs();
                    }
                    else if(changePromo12Hrs !== Number(changePromo12Hrs)){
                        alert("Input number only!");
                        changepromo12Hrs();
                    }
                    else{
                        selectEditRoomIndex.Promo12hrs = changePromo12Hrs;
                        console.log("12 Hour Promo Updated!");
                        console.table(selectEditRoomIndex);
                        adminFunctions
                    }
                }
            }
            else if(selectToEditTrim === "7"){
                changepromo24Hrs();
                function changepromo24Hrs(){
                    console.log("7. Change 24Hours Promo");

                    let changePromo24Hrs = prompt("Enter new 24 Hours Promo");
                    let changePromo24HrsTrim = changePromo24Hrs;
                    changePromo24Hrs = Number(changePromo24Hrs);

                    if(changePromo24HrsTrim === null){
                        alert("Cancelled");
                        SelecttoEdit();
                    }
                    else if(changePromo24HrsTrim.trim()==""){
                        alert("Empty");
                        changepromo24Hrs();
                    }
                    else if(changePromo24Hrs !== Number(changePromo24Hrs)){
                        alert("Input number only");
                        changepromo24Hrs();
                    }
                    else{
                        selectEditRoomIndex.Promo24hrs = changePromo24Hrs;
                        console.log("24 Hours Promo Updated!");
                        console.table(selectEditRoomIndex);
                        adminFunctions();
                    }
                }
            }
            else{
                alert("Selected Not Found")
                SelecttoEdit();
            }
        }
    }
    else{ // false
        alert("Index Not Found");
        editupdateRoom();
    }
}

function deleteroomList(){
    console.log("3. Delete a Room list");
    console.log("Select a Room to Delete");

    let roomDeletion = prompt("Select by Index");
    let roomDeletionTrim = roomDeletion;
    roomDeletion = Number(roomDeletion);
    let selectRoomtoDelete = roomList[roomDeletion];

    if(roomDeletionTrim === null){
        alert("Delete Function cancelled");
        adminFunctions();
    }
    else if(roomDeletionTrim.trim()==""){
        alert("Empty");
        deleteroomList();
    }
    else if(roomDeletion !== Number(roomDeletion)){
        alert("Input Number only!");
        deleteroomList();
    }
    else if(selectRoomtoDelete){
        console.table(selectRoomtoDelete);
        const confirmDelete = confirm("are you Sure to Delete ");

        if(confirmDelete){
            selectRoomtoDelete = roomList.pop();
            console.log("Update 1 Room has been Deleted!");
            adminFunctions();
        }
        else{
            alert("deletion Cancelled!");
            adminFunctions();
        }
    }
    else{
        alert("Input not Found");
        deleteroomList();
    }

}

function bookedHistoryDisplay(){
    console.log("\nBooked History List:")
    console.table(bookedHistory);
    adminFunctions();
}