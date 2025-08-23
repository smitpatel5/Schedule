// // RA Shift Schedule Application
// class RAScheduleApp {
//     constructor() {
//         this.ras = []; // Start with empty RA list - will be populated from schedule data
//         this.shifts = [];
//         this.selectedMonth = '8'; // Default to August
//         this.selectedRA = 'all'; // Track selected RA for filtering
        
//         this.init();
//     }

//     init() {
//         this.loadShifts();
//         this.populateFilters();
//         this.renderSchedule();
//         this.renderRASummary();
//         this.updateStats();
//         this.setupEventListeners();
//         this.updateMonthSelectorDisplay();
//     }

//     loadShifts() {
//         // Check if we already have shifts loaded
//         if (this.shifts.length > 0) {
//             return; // Already loaded
//         }
        
//         // Clear any existing data from localStorage to remove old break duties
//         localStorage.removeItem('wwcc-ra-shifts');
        
//         // Start with comprehensive RA duty schedule data (without break duties)
//         this.shifts = this.getDefaultShifts();
//         this.saveShifts();
        
//     }

//     getDefaultShifts() {
//         return [
//             // August 2025
//             { id: 'aug-22-primary', date: '2025-08-23', ra: 'Thanh', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'aug-22-secondary', date: '2025-08-23', ra: 'Caroline', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'aug-23-primary', date: '2025-08-24', ra: 'Caroline', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'aug-23-secondary', date: '2025-08-24', ra: 'Elizabeth', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'aug-24-primary', date: '2025-08-25', ra: 'Thanh', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'aug-24-secondary', date: '2025-08-25', ra: 'Abigel', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'aug-25-primary', date: '2025-08-26', ra: 'Mano', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'aug-25-secondary', date: '2025-08-26', ra: 'Smit', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'aug-26-primary', date: '2025-08-27', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'aug-26-secondary', date: '2025-08-27', ra: 'Terry', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'aug-27-primary', date: '2025-08-28', ra: 'Mano', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'aug-27-secondary', date: '2025-08-28', ra: 'Caroline', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'aug-28-primary', date: '2025-08-29', ra: 'Terry', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'aug-28-secondary', date: '2025-08-29', ra: 'Elizabeth', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'aug-29-primary', date: '2025-08-30', ra: 'Thanh', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'aug-29-secondary', date: '2025-08-30', ra: 'Mano', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'aug-30-primary', date: '2025-08-31', ra: 'Elizabeth', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'aug-30-secondary', date: '2025-08-31', ra: 'Smit', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'aug-31-primary', date: '2025-09-01', ra: 'Ethan', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'aug-31-secondary', date: '2025-09-01', ra: 'Terry', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },

//             // September 2025
//             { id: 'sep-1-primary', date: '2025-09-02', ra: 'Caroline', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'sep-1-secondary', date: '2025-09-02', ra: 'Elizabeth', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'sep-2-primary', date: '2025-09-03', ra: 'Terry', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'sep-2-secondary', date: '2025-09-03', ra: 'Thanh', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'sep-3-primary', date: '2025-09-04', ra: 'Caroline', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'sep-3-secondary', date: '2025-09-04', ra: 'Sarah', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'sep-4-primary', date: '2025-09-05', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'sep-4-secondary', date: '2025-09-05', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'sep-5-primary', date: '2025-09-06', ra: 'A\'Maya', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'sep-5-secondary', date: '2025-09-06', ra: 'Abigel', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'sep-6-primary', date: '2025-09-07', ra: 'Thanh', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'sep-6-secondary', date: '2025-09-07', ra: 'Caroline', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'sep-7-primary', date: '2025-09-08', ra: 'Brooke', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'sep-7-secondary', date: '2025-09-08', ra: 'Sarah', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'sep-8-primary', date: '2025-09-09', ra: 'Ethan', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'sep-8-secondary', date: '2025-09-09', ra: 'A\'Maya', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'sep-9-primary', date: '2025-09-10', ra: 'Sarah', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'sep-9-secondary', date: '2025-09-10', ra: 'Smit', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'sep-10-primary', date: '2025-09-11', ra: 'Brooke', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'sep-10-secondary', date: '2025-09-11', ra: 'Ethan', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'sep-11-primary', date: '2025-09-12', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'sep-11-secondary', date: '2025-09-12', ra: 'Elizabeth', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'sep-12-primary', date: '2025-09-13', ra: 'Abigel', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'sep-12-secondary', date: '2025-09-13', ra: 'A\'Maya', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'sep-13-primary', date: '2025-09-14', ra: 'Terry', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'sep-13-secondary', date: '2025-09-14', ra: 'Elizabeth', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'sep-14-primary', date: '2025-09-15', ra: 'Ethan', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'sep-14-secondary', date: '2025-09-15', ra: 'Thanh', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'sep-15-primary', date: '2025-09-16', ra: 'Abigel', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'sep-15-secondary', date: '2025-09-16', ra: 'Elizabeth', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'sep-16-primary', date: '2025-09-17', ra: 'Terry', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'sep-16-secondary', date: '2025-09-17', ra: 'Caroline', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'sep-17-primary', date: '2025-09-18', ra: 'Smit', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'sep-17-secondary', date: '2025-09-18', ra: 'Ethan', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'sep-18-primary', date: '2025-09-19', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'sep-18-secondary', date: '2025-09-19', ra: 'Thanh', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'sep-19-primary', date: '2025-09-20', ra: 'Sarah', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'sep-19-secondary', date: '2025-09-20', ra: 'Mano', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'sep-20-primary', date: '2025-09-21', ra: 'Elizabeth', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'sep-20-secondary', date: '2025-09-21', ra: 'Ethan', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'sep-21-primary', date: '2025-09-22', ra: 'Terry', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'sep-21-secondary', date: '2025-09-22', ra: 'Thanh', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'sep-22-primary', date: '2025-09-23', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'sep-22-secondary', date: '2025-09-23', ra: 'Caroline', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'sep-23-primary', date: '2025-09-24', ra: 'Abigel', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'sep-23-secondary', date: '2025-09-24', ra: 'Brooke', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'sep-24-primary', date: '2025-09-25', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'sep-24-secondary', date: '2025-09-25', ra: 'Caroline', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'sep-25-primary', date: '2025-09-26', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'sep-25-secondary', date: '2025-09-26', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'sep-26-primary', date: '2025-09-27', ra: 'Smit', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'sep-26-secondary', date: '2025-09-27', ra: 'Thanh', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'sep-27-primary', date: '2025-09-28', ra: 'Terry', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'sep-27-secondary', date: '2025-09-28', ra: 'Ethan', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'sep-28-primary', date: '2025-09-29', ra: 'Caroline', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'sep-28-secondary', date: '2025-09-29', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'sep-29-primary', date: '2025-09-30', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'sep-29-secondary', date: '2025-09-30', ra: 'Elizabeth', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'sep-30-primary', date: '2025-10-01', ra: 'Abigel', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'sep-30-secondary', date: '2025-10-01', ra: 'Caroline', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },

//             // October 2025
//             { id: 'oct-1-primary', date: '2025-10-02', ra: 'Abigel', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'oct-1-secondary', date: '2025-10-02', ra: 'Sarah', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'oct-2-primary', date: '2025-10-03', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'oct-2-secondary', date: '2025-10-03', ra: 'Thanh', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'oct-3-primary', date: '2025-10-04', ra: 'Sarah', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'oct-3-secondary', date: '2025-10-04', ra: 'Terry', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'oct-4-primary', date: '2025-10-05', ra: 'Caroline', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'oct-4-secondary', date: '2025-10-05', ra: 'Abigel', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'oct-5-primary', date: '2025-10-06', ra: 'Mano', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'oct-5-secondary', date: '2025-10-06', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'oct-6-primary', date: '2025-10-07', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'oct-6-secondary', date: '2025-10-07', ra: 'Ethan', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'oct-7-primary', date: '2025-10-08', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'oct-7-secondary', date: '2025-10-08', ra: 'Abigel', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'oct-8-primary', date: '2025-10-09', ra: 'A\'Maya', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'oct-8-secondary', date: '2025-10-09', ra: 'Sarah', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'oct-9-primary', date: '2025-10-10', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'oct-9-secondary', date: '2025-10-10', ra: 'Elizabeth', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'oct-10-primary', date: '2025-10-11', ra: 'Abigel', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'oct-10-secondary', date: '2025-10-11', ra: 'Thanh', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'oct-11-primary', date: '2025-10-12', ra: 'Elizabeth', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'oct-11-secondary', date: '2025-10-12', ra: 'Thanh', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'oct-12-primary', date: '2025-10-13', ra: 'Mano', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'oct-12-secondary', date: '2025-10-13', ra: 'A\'Maya', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
         
//             { id: 'oct-15-primary', date: '2025-10-16', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'oct-15-secondary', date: '2025-10-16', ra: 'Brooke', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'oct-16-primary', date: '2025-10-17', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'oct-16-secondary', date: '2025-10-17', ra: 'Ethan', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'oct-17-primary', date: '2025-10-18', ra: 'Brooke', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'oct-17-secondary', date: '2025-10-18', ra: 'Terry', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'oct-18-primary', date: '2025-10-19', ra: 'Smit', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'oct-18-secondary', date: '2025-10-19', ra: 'Sarah', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'oct-19-primary', date: '2025-10-20', ra: 'Mano', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'oct-19-secondary', date: '2025-10-20', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'oct-20-primary', date: '2025-10-21', ra: 'Caroline', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'oct-20-secondary', date: '2025-10-21', ra: 'Abigel', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'oct-21-primary', date: '2025-10-22', ra: 'Mano', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'oct-21-secondary', date: '2025-10-22', ra: 'Terry', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'oct-22-primary', date: '2025-10-23', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'oct-22-secondary', date: '2025-10-23', ra: 'Ethan', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'oct-23-primary', date: '2025-10-24', ra: 'Mano', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'oct-23-secondary', date: '2025-10-24', ra: 'Smit', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'oct-24-primary', date: '2025-10-25', ra: 'Brooke', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'oct-24-secondary', date: '2025-10-25', ra: 'Ethan', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'oct-25-primary', date: '2025-10-26', ra: 'Mano', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'oct-25-secondary', date: '2025-10-26', ra: 'Sarah', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'oct-26-primary', date: '2025-10-27', ra: 'Brooke', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'oct-26-secondary', date: '2025-10-27', ra: 'Terry', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'oct-27-primary', date: '2025-10-28', ra: 'Ethan', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'oct-27-secondary', date: '2025-10-28', ra: 'Sarah', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'oct-28-primary', date: '2025-10-29', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'oct-28-secondary', date: '2025-10-29', ra: 'Terry', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'oct-29-primary', date: '2025-10-30', ra: 'Brooke', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'oct-29-secondary', date: '2025-10-30', ra: 'Sarah', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'oct-30-primary', date: '2025-10-31', ra: 'Caroline', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'oct-30-secondary', date: '2025-10-31', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'oct-31-primary', date: '2025-11-01', ra: 'Abigel', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'oct-31-secondary', date: '2025-11-01', ra: 'Sarah', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },

//             // November 2025
//             { id: 'nov-1-primary', date: '2025-11-02', ra: 'Smit', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'nov-1-secondary', date: '2025-11-02', ra: 'Caroline', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'nov-2-primary', date: '2025-11-03', ra: 'Terry', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'nov-2-secondary', date: '2025-11-03', ra: 'Mano', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'nov-3-primary', date: '2025-11-04', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'nov-3-secondary', date: '2025-11-04', ra: 'Ethan', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'nov-4-primary', date: '2025-11-05', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'nov-4-secondary', date: '2025-11-05', ra: 'Smit', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'nov-5-primary', date: '2025-11-06', ra: 'Caroline', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'nov-5-secondary', date: '2025-11-06', ra: 'A\'Maya', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'nov-6-primary', date: '2025-11-07', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'nov-6-secondary', date: '2025-11-07', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'nov-7-primary', date: '2025-11-08', ra: 'Sarah', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'nov-7-secondary', date: '2025-11-08', ra: 'A\'Maya', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'nov-8-primary', date: '2025-11-09', ra: 'Ethan', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'nov-8-secondary', date: '2025-11-09', ra: 'Smit', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'nov-9-primary', date: '2025-11-10', ra: 'Thanh', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'nov-9-secondary', date: '2025-11-10', ra: 'Terry', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'nov-10-primary', date: '2025-11-11', ra: 'Ethan', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'nov-10-secondary', date: '2025-11-11', ra: 'A\'Maya', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'nov-11-primary', date: '2025-11-12', ra: 'Terry', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'nov-11-secondary', date: '2025-11-12', ra: 'Abigel', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'nov-12-primary', date: '2025-11-13', ra: 'Brooke', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'nov-12-secondary', date: '2025-11-13', ra: 'A\'Maya', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'nov-13-primary', date: '2025-11-14', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'nov-13-secondary', date: '2025-11-14', ra: 'Ethan', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'nov-14-primary', date: '2025-11-15', ra: 'A\'Maya', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'nov-14-secondary', date: '2025-11-15', ra: 'Brooke', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'nov-15-primary', date: '2025-11-16', ra: 'Mano', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'nov-15-secondary', date: '2025-11-16', ra: 'Brooke', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'nov-16-primary', date: '2025-11-17', ra: 'Ethan', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'nov-16-secondary', date: '2025-11-17', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'nov-17-primary', date: '2025-11-18', ra: 'Caroline', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'nov-17-secondary', date: '2025-11-18', ra: 'Smit', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'nov-18-primary', date: '2025-11-19', ra: 'Abigel', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'nov-18-secondary', date: '2025-11-19', ra: 'Thanh', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'nov-19-primary', date: '2025-11-20', ra: 'Brooke', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'nov-19-secondary', date: '2025-11-20', ra: 'Caroline', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'nov-20-primary', date: '2025-11-21', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'nov-20-secondary', date: '2025-11-21', ra: 'Smit', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'nov-21-primary', date: '2025-11-22', ra: 'Terry', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'nov-21-secondary', date: '2025-11-22', ra: 'Brooke', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'nov-22-primary', date: '2025-11-23', ra: 'Mano', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'nov-22-secondary', date: '2025-11-23', ra: 'A\'Maya', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'nov-23-primary', date: '2025-11-24', ra: 'Ethan', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'nov-23-secondary', date: '2025-11-24', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'nov-24-primary', date: '2025-11-25', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'nov-24-secondary', date: '2025-11-25', ra: 'Sarah', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//                         { id: 'nov-25-primary', date: '2025-11-26', ra: 'Caroline', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'nov-25-secondary', date: '2025-11-26', ra: 'Brooke', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },

//             // December 2025
//             { id: 'dec-1-primary', date: '2025-12-02', ra: 'Abigel', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'dec-1-secondary', date: '2025-12-02', ra: 'Smit', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'dec-2-primary', date: '2025-12-03', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'dec-2-secondary', date: '2025-12-03', ra: 'Abigel', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'dec-3-primary', date: '2025-12-04', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'dec-3-secondary', date: '2025-12-04', ra: 'A\'Maya', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'dec-4-primary', date: '2025-12-05', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'dec-4-secondary', date: '2025-12-05', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'dec-5-primary', date: '2025-12-06', ra: 'Brooke', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'dec-5-secondary', date: '2025-12-06', ra: 'A\'Maya', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
//             { id: 'dec-6-primary', date: '2025-12-07', ra: 'Ethan', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
//             { id: 'dec-6-secondary', date: '2025-12-07', ra: 'Abigel', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
//             { id: 'dec-7-primary', date: '2025-12-08', ra: 'Sarah', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
//             { id: 'dec-7-secondary', date: '2025-12-08', ra: 'Mano', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
//             { id: 'dec-8-primary', date: '2025-12-09', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
//             { id: 'dec-8-secondary', date: '2025-12-09', ra: 'Caroline', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
//             { id: 'dec-9-primary', date: '2025-12-10', ra: 'Smit', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
//             { id: 'dec-9-secondary', date: '2025-12-10', ra: 'Abigel', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
//             { id: 'dec-10-primary', date: '2025-12-11', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
//             { id: 'dec-10-secondary', date: '2025-12-11', ra: 'A\'Maya', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
//             { id: 'dec-11-primary', date: '2025-12-12', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
//             { id: 'dec-11-secondary', date: '2025-12-12', ra: 'Thanh', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
//             { id: 'dec-12-primary', date: '2025-12-13', ra: 'Caroline', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
//             { id: 'dec-12-secondary', date: '2025-12-13', ra: 'Ethan', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' }
//         ];
//     }

//     saveShifts() {
//         localStorage.setItem('wwcc-ra-shifts', JSON.stringify(this.shifts));
//     }

//     populateFilters() {
//         const raSelect = document.getElementById('shiftRA');
//         const raFilterSelect = document.getElementById('raSelect');
        
//         // Clear existing options
//         raSelect.innerHTML = '<option value="">Select RA</option>';
//         raFilterSelect.innerHTML = '<option value="all">All RAs</option>';
        
//         // Extract unique RA names from shifts data
//         const uniqueRAs = [...new Set(this.shifts.map(shift => shift.ra))].sort();
//         this.ras = uniqueRAs;
        
//         // Populate RA select in modal
//         uniqueRAs.forEach(ra => {
//             const modalOption = document.createElement('option');
//             modalOption.value = ra;
//             modalOption.textContent = ra;
//             raSelect.appendChild(modalOption);
            
//             // Also populate the RA filter dropdown
//             const filterOption = document.createElement('option');
//             filterOption.value = ra;
//             filterOption.textContent = ra;
//             raFilterSelect.appendChild(filterOption);
//         });
//     }

//     setupEventListeners() {
//         // Add shift form submission
//         document.getElementById('addShiftForm').addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.addShift();
//         });

//         // Month dropdown change event
//         const monthSelect = document.getElementById('monthSelect');
//         if (monthSelect) {
//             monthSelect.addEventListener('change', () => {
//                 this.changeMonth();
//             });
//         }

//         // RA dropdown change event
//         const raSelect = document.getElementById('raSelect');
//         if (raSelect) {
//             raSelect.addEventListener('change', () => {
//                 this.changeRA();
//             });
//         }

//     // Initial render for default month and RA
//     this.changeMonth();

//         // Close modal when clicking outside
//         window.addEventListener('click', (e) => {
//             const addShiftModal = document.getElementById('addShiftModal');
//             if (e.target === addShiftModal) {
//                 this.closeAddShiftModal();
//             }
//         });
//     }

//     addShift() {
//         const date = document.getElementById('shiftDate').value;
//         const ra = document.getElementById('shiftRA').value;
//         const type = document.getElementById('shiftType').value;
//         const notes = document.getElementById('shiftNotes').value;

//         if (!date || !ra || !type) {
//             alert('Please fill in all required fields');
//             return;
//         }

//         const newShift = {
//             id: `shift-${Date.now()}`,
//             date: date,
//             ra: ra,
//             type: type,
//             notes: notes
//         };

//         this.shifts.push(newShift);
//         this.saveShifts();
//         this.renderSchedule();
//         this.renderRASummary();
//         this.updateStats();
//         this.closeAddShiftModal();
//         this.resetForm();
//     }

//     resetForm() {
//         document.getElementById('addShiftForm').reset();
//     }

//     renderSchedule() {
//         const scheduleGrid = document.getElementById('scheduleGrid');
//         scheduleGrid.innerHTML = '';

//         // If no shifts exist, show a message
//         if (this.shifts.length === 0) {
//             scheduleGrid.innerHTML = `
//                 <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #718096;">
//                     <i class="fas fa-calendar-plus" style="font-size: 3rem; margin-bottom: 20px; color: #a0aec0;"></i>
//                     <h3 style="margin-bottom: 15px; color: #4a5568;">No Schedule Data</h3>
//                     <p style="margin-bottom: 25px; font-size: 1.1rem;">Your RA duty schedule is currently empty.</p>
//                     <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
//                         <button class="btn btn-secondary" onclick="openAddShiftModal()">
//                             <i class="fas fa-plus"></i> Add First Shift
//                         </button>
//                     </div>
//                 </div>
//             `;
//             return;
//         }

//         // Group shifts by month
//         const monthlyShifts = this.groupShiftsByMonth();
        
//         // Sort months chronologically
//         const sortedMonths = Object.keys(monthlyShifts).sort((a, b) => {
//             const monthA = parseInt(a);
//             const monthB = parseInt(b);
//             return monthA - monthB;
//         });

//         // Filter months based on selection
//         const monthsToShow = sortedMonths.filter(month => {
//             return month.toString() === this.selectedMonth;
//         });

//         monthsToShow.forEach(month => {
//             let monthShifts = monthlyShifts[month];
            
//             // Filter by RA if a specific RA is selected
//             if (this.selectedRA !== 'all') {
//                 monthShifts = monthShifts.filter(shift => shift.ra === this.selectedRA);
//             }
            
//             const monthCard = this.createMonthCard(month, monthShifts);
//             scheduleGrid.appendChild(monthCard);
//         });
//     }

//     changeMonth() {
//         const monthSelect = document.getElementById('monthSelect');
//         this.selectedMonth = monthSelect.value;
//         this.renderSchedule();
//         this.updateMonthSelectorDisplay();
//     }

//     changeRA() {
//         const raSelect = document.getElementById('raSelect');
//         this.selectedRA = raSelect.value;
//         this.renderSchedule();
//     }

//     updateMonthSelectorDisplay() {
//         const monthSelect = document.getElementById('monthSelect');
//         const monthNames = {
//             '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December'
//         };
        
//         // Find the label within the month-selector div
//         const monthSelectorDiv = monthSelect.closest('.month-selector');
//         const monthLabel = monthSelectorDiv.querySelector('label');
        
//         if (monthLabel) {
//             monthLabel.textContent = `Schedule for ${monthNames[this.selectedMonth]}:`;
//         }
//     }

//     groupShiftsByMonth() {
//         const monthlyShifts = {};
        
//         this.shifts.forEach(shift => {
//             const month = new Date(shift.date).getMonth() + 1;
//             if (!monthlyShifts[month]) {
//                 monthlyShifts[month] = [];
//             }
//             monthlyShifts[month].push(shift);
//         });

//         return monthlyShifts;
//     }

//     createMonthCard(month, shifts) {
//         const monthCard = document.createElement('div');
//         monthCard.className = 'month-card';
        
//         const monthNames = {
//             '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December',
//             '1': 'January', '2': 'February', '3': 'March', '4': 'April', '5': 'May'
//         };
        
//         const monthName = monthNames[month];
//         const primaryCount = shifts.filter(s => s.type === 'primary').length;
//         const secondaryCount = shifts.filter(s => s.type === 'secondary').length;
        
//         monthCard.innerHTML = `
//             <div class="month-header">
//                 <h3>${monthName}</h3>
//                 <div class="month-stats">
//                     ${primaryCount} Primary, ${secondaryCount} Secondary
//                 </div>
//             </div>
//             ${this.renderMonthShifts(shifts)}
//         `;
        
//         return monthCard;
//     }

//     renderMonthShifts(shifts) {
//         if (shifts.length === 0) {
//             return '<p style="color: #718096; font-style: italic; text-align: center; padding: 20px;">No shifts scheduled for this month</p>';
//         }

//         // Sort shifts by date
//         const sortedShifts = shifts.sort((a, b) => new Date(a.date) - new Date(b.date));
        
//         return sortedShifts.map(shift => {
//             const date = new Date(shift.date);
//             const formattedDate = date.toLocaleDateString('en-US', { 
//                 weekday: 'short', 
//                 month: 'short', 
//                 day: 'numeric' 
//             });
            
//             // Determine the appropriate CSS class for shift types
//             let shiftTypeClass = shift.type;
            
//             return `
//                 <div class="shift-item">
//                     <div class="shift-date">${formattedDate}</div>
//                     <div class="shift-info">
//                         <span class="shift-ra">${shift.ra}</span>
//                         <span class="shift-type ${shiftTypeClass}">${shift.type}</span>
//                     </div>
//                 </div>
//             `;
//         }).join('');
//     }

//     renderRASummary() {
//         const raGrid = document.getElementById('raGrid');
//         raGrid.innerHTML = '';

//         // If no RAs exist yet, show a message
//         if (this.ras.length === 0) {
//             raGrid.innerHTML = `
//                 <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #718096;">
//                     <i class="fas fa-users" style="font-size: 2.5rem; margin-bottom: 15px; color: #a0aec0;"></i>
//                     <h3 style="margin-bottom: 10px; color: #4a5568;">No RAs Assigned</h3>
//                     <p style="font-size: 1rem;">RA information will appear here once you add shifts.</p>
//                 </div>
//             `;
//             return;
//         }

//         // If no shifts exist, show a message
//         if (this.shifts.length === 0) {
//             raGrid.innerHTML = `
//                 <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #718096;">
//                     <i class="fas fa-users" style="font-size: 2.5rem; margin-bottom: 15px; color: #a0aec0;"></i>
//                     <h3 style="margin-bottom: 10px; color: #4a5568;">No RA Assignments</h3>
//                     <p style="font-size: 1rem;">RA summary will appear here once shifts are scheduled.</p>
//                 </div>
//             `;
//             return;
//         }

//         this.ras.forEach(ra => {
//             const raShifts = this.shifts.filter(shift => shift.ra === ra);
//             const primaryShifts = raShifts.filter(shift => shift.type === 'primary');
//             const secondaryShifts = raShifts.filter(shift => shift.type === 'secondary');
            
//             const raCard = document.createElement('div');
//             raCard.className = 'ra-card';
            
//             raCard.innerHTML = `
//                 <div class="ra-header">
//                     <div class="ra-name">${ra}</div>
//                     <div class="ra-total">${raShifts.length}</div>
//                 </div>
//                 <div class="ra-stats">
//                     <div class="ra-stat">
//                         <div class="ra-stat-number">${primaryShifts.length}</div>
//                         <div class="ra-stat-label">Primary</div>
//                     </div>
//                     <div class="ra-stat">
//                         <div class="ra-stat-number">${secondaryShifts.length}</div>
//                         <div class="ra-stat-label">Secondary</div>
//                     </div>
//                 </div>
//                 <div class="ra-shifts">
//                     ${this.getRAShiftSummary(raShifts)}
//                 </div>
//             `;
            
//             raGrid.appendChild(raCard);
//         });
//     }

//     getRAShiftSummary(shifts) {
//         if (shifts.length === 0) {
//             return 'No shifts assigned';
//         }
        
//         // Just show the total count without detailed descriptions
//         return `${shifts.length} shifts assigned`;
//     }

//     updateStats() {
//         const primaryCount = this.shifts.filter(shift => shift.type === 'primary').length;
//         const secondaryCount = this.shifts.filter(shift => shift.type === 'secondary').length;
        
//         // When no shifts are scheduled, show 0 for everything
//         const totalDays = this.shifts.length > 0 ? 300 : 0;
//         const assignedDays = primaryCount + secondaryCount;
//         const unassignedDays = Math.max(0, totalDays - assignedDays);
        
//         document.getElementById('primaryCount').textContent = primaryCount;
//         document.getElementById('secondaryCount').textContent = secondaryCount;
//         document.getElementById('unassignedCount').textContent = unassignedDays;
//     }

//     closeAddShiftModal() {
//         document.getElementById('addShiftModal').style.display = 'none';
//     }
// }

// // Modal functions
// function openAddShiftModal() {
//     document.getElementById('addShiftModal').style.display = 'block';
//     document.getElementById('shiftDate').focus();
// }

// function closeAddShiftModal() {
//     document.getElementById('addShiftModal').style.display = 'none';
// }

// // Initialize the application
// let app;
// document.addEventListener('DOMContentLoaded', () => {
//     app = new RAScheduleApp();
// });

// // Temporary function to clear all data - remove this after testing
// function clearAllData() {
//     localStorage.removeItem('wwcc-ra-shifts');
//     location.reload();
// } 


class RAScheduleApp {
            constructor() {
                this.ras = [];
                this.shifts = [];
                this.selectedMonth = '8';
                this.selectedRA = 'all';
                
                this.init();
            }

            init() {
                this.loadShifts();
                this.populateFilters();
                this.renderSchedule();
                this.renderRASummary();
                this.setupEventListeners();
            }

            loadShifts() {
                if (this.shifts.length > 0) {
                    return;
                }
                
                this.shifts = this.getDefaultShifts();
            }

 getDefaultShifts() {
        return [
            // August 2025
            { id: 'aug-22-primary', date: '2025-08-23', ra: 'Thanh', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'aug-22-secondary', date: '2025-08-23', ra: 'Caroline', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'aug-23-primary', date: '2025-08-24', ra: 'Caroline', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'aug-23-secondary', date: '2025-08-24', ra: 'Elizabeth', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'aug-24-primary', date: '2025-08-25', ra: 'Thanh', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'aug-24-secondary', date: '2025-08-25', ra: 'Abigel', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'aug-25-primary', date: '2025-08-26', ra: 'Mano', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'aug-25-secondary', date: '2025-08-26', ra: 'Smit', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'aug-26-primary', date: '2025-08-27', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'aug-26-secondary', date: '2025-08-27', ra: 'Terry', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'aug-27-primary', date: '2025-08-28', ra: 'Mano', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'aug-27-secondary', date: '2025-08-28', ra: 'Caroline', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'aug-28-primary', date: '2025-08-29', ra: 'Terry', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'aug-28-secondary', date: '2025-08-29', ra: 'Elizabeth', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'aug-29-primary', date: '2025-08-30', ra: 'Thanh', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'aug-29-secondary', date: '2025-08-30', ra: 'Mano', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'aug-30-primary', date: '2025-08-31', ra: 'Elizabeth', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'aug-30-secondary', date: '2025-08-31', ra: 'Smit', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'aug-31-primary', date: '2025-09-01', ra: 'Ethan', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'aug-31-secondary', date: '2025-09-01', ra: 'Terry', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },

            // September 2025
            { id: 'sep-1-primary', date: '2025-09-02', ra: 'Caroline', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'sep-1-secondary', date: '2025-09-02', ra: 'Elizabeth', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'sep-2-primary', date: '2025-09-03', ra: 'Terry', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'sep-2-secondary', date: '2025-09-03', ra: 'Thanh', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'sep-3-primary', date: '2025-09-04', ra: 'Caroline', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'sep-3-secondary', date: '2025-09-04', ra: 'Sarah', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'sep-4-primary', date: '2025-09-05', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'sep-4-secondary', date: '2025-09-05', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'sep-5-primary', date: '2025-09-06', ra: 'A\'Maya', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'sep-5-secondary', date: '2025-09-06', ra: 'Abigel', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'sep-6-primary', date: '2025-09-07', ra: 'Thanh', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'sep-6-secondary', date: '2025-09-07', ra: 'Caroline', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'sep-7-primary', date: '2025-09-08', ra: 'Brooke', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'sep-7-secondary', date: '2025-09-08', ra: 'Sarah', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'sep-8-primary', date: '2025-09-09', ra: 'Ethan', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'sep-8-secondary', date: '2025-09-09', ra: 'A\'Maya', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'sep-9-primary', date: '2025-09-10', ra: 'Sarah', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'sep-9-secondary', date: '2025-09-10', ra: 'Smit', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'sep-10-primary', date: '2025-09-11', ra: 'Brooke', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'sep-10-secondary', date: '2025-09-11', ra: 'Ethan', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'sep-11-primary', date: '2025-09-12', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'sep-11-secondary', date: '2025-09-12', ra: 'Elizabeth', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'sep-12-primary', date: '2025-09-13', ra: 'Abigel', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'sep-12-secondary', date: '2025-09-13', ra: 'A\'Maya', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'sep-13-primary', date: '2025-09-14', ra: 'Terry', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'sep-13-secondary', date: '2025-09-14', ra: 'Elizabeth', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'sep-14-primary', date: '2025-09-15', ra: 'Ethan', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'sep-14-secondary', date: '2025-09-15', ra: 'Thanh', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'sep-15-primary', date: '2025-09-16', ra: 'Abigel', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'sep-15-secondary', date: '2025-09-16', ra: 'Elizabeth', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'sep-16-primary', date: '2025-09-17', ra: 'Terry', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'sep-16-secondary', date: '2025-09-17', ra: 'Caroline', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'sep-17-primary', date: '2025-09-18', ra: 'Smit', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'sep-17-secondary', date: '2025-09-18', ra: 'Ethan', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'sep-18-primary', date: '2025-09-19', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'sep-18-secondary', date: '2025-09-19', ra: 'Thanh', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'sep-19-primary', date: '2025-09-20', ra: 'Sarah', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'sep-19-secondary', date: '2025-09-20', ra: 'Mano', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'sep-20-primary', date: '2025-09-21', ra: 'Elizabeth', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'sep-20-secondary', date: '2025-09-21', ra: 'Ethan', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'sep-21-primary', date: '2025-09-22', ra: 'Terry', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'sep-21-secondary', date: '2025-09-22', ra: 'Thanh', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'sep-22-primary', date: '2025-09-23', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'sep-22-secondary', date: '2025-09-23', ra: 'Caroline', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'sep-23-primary', date: '2025-09-24', ra: 'Abigel', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'sep-23-secondary', date: '2025-09-24', ra: 'Brooke', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'sep-24-primary', date: '2025-09-25', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'sep-24-secondary', date: '2025-09-25', ra: 'Caroline', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'sep-25-primary', date: '2025-09-26', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'sep-25-secondary', date: '2025-09-26', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'sep-26-primary', date: '2025-09-27', ra: 'Smit', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'sep-26-secondary', date: '2025-09-27', ra: 'Thanh', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'sep-27-primary', date: '2025-09-28', ra: 'Terry', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'sep-27-secondary', date: '2025-09-28', ra: 'Ethan', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'sep-28-primary', date: '2025-09-29', ra: 'Caroline', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'sep-28-secondary', date: '2025-09-29', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'sep-29-primary', date: '2025-09-30', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'sep-29-secondary', date: '2025-09-30', ra: 'Elizabeth', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'sep-30-primary', date: '2025-10-01', ra: 'Abigel', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'sep-30-secondary', date: '2025-10-01', ra: 'Caroline', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },

            // October 2025
            { id: 'oct-1-primary', date: '2025-10-02', ra: 'Abigel', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'oct-1-secondary', date: '2025-10-02', ra: 'Sarah', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'oct-2-primary', date: '2025-10-03', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'oct-2-secondary', date: '2025-10-03', ra: 'Thanh', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'oct-3-primary', date: '2025-10-04', ra: 'Sarah', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'oct-3-secondary', date: '2025-10-04', ra: 'Terry', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'oct-4-primary', date: '2025-10-05', ra: 'Caroline', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'oct-4-secondary', date: '2025-10-05', ra: 'Abigel', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'oct-5-primary', date: '2025-10-06', ra: 'Mano', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'oct-5-secondary', date: '2025-10-06', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'oct-6-primary', date: '2025-10-07', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'oct-6-secondary', date: '2025-10-07', ra: 'Ethan', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'oct-7-primary', date: '2025-10-08', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'oct-7-secondary', date: '2025-10-08', ra: 'Abigel', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'oct-8-primary', date: '2025-10-09', ra: 'A\'Maya', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'oct-8-secondary', date: '2025-10-09', ra: 'Sarah', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'oct-9-primary', date: '2025-10-10', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'oct-9-secondary', date: '2025-10-10', ra: 'Elizabeth', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'oct-10-primary', date: '2025-10-11', ra: 'Abigel', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'oct-10-secondary', date: '2025-10-11', ra: 'Thanh', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'oct-11-primary', date: '2025-10-12', ra: 'Elizabeth', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'oct-11-secondary', date: '2025-10-12', ra: 'Thanh', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'oct-12-primary', date: '2025-10-13', ra: 'Mano', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'oct-12-secondary', date: '2025-10-13', ra: 'A\'Maya', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
         
            { id: 'oct-15-primary', date: '2025-10-16', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'oct-15-secondary', date: '2025-10-16', ra: 'Brooke', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'oct-16-primary', date: '2025-10-17', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'oct-16-secondary', date: '2025-10-17', ra: 'Ethan', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'oct-17-primary', date: '2025-10-18', ra: 'Brooke', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'oct-17-secondary', date: '2025-10-18', ra: 'Terry', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'oct-18-primary', date: '2025-10-19', ra: 'Smit', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'oct-18-secondary', date: '2025-10-19', ra: 'Sarah', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'oct-19-primary', date: '2025-10-20', ra: 'Mano', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'oct-19-secondary', date: '2025-10-20', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'oct-20-primary', date: '2025-10-21', ra: 'Caroline', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'oct-20-secondary', date: '2025-10-21', ra: 'Abigel', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'oct-21-primary', date: '2025-10-22', ra: 'Mano', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'oct-21-secondary', date: '2025-10-22', ra: 'Terry', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'oct-22-primary', date: '2025-10-23', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'oct-22-secondary', date: '2025-10-23', ra: 'Ethan', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'oct-23-primary', date: '2025-10-24', ra: 'Mano', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'oct-23-secondary', date: '2025-10-24', ra: 'Smit', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'oct-24-primary', date: '2025-10-25', ra: 'Brooke', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'oct-24-secondary', date: '2025-10-25', ra: 'Ethan', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'oct-25-primary', date: '2025-10-26', ra: 'Mano', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'oct-25-secondary', date: '2025-10-26', ra: 'Sarah', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'oct-26-primary', date: '2025-10-27', ra: 'Brooke', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'oct-26-secondary', date: '2025-10-27', ra: 'Terry', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'oct-27-primary', date: '2025-10-28', ra: 'Ethan', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'oct-27-secondary', date: '2025-10-28', ra: 'Sarah', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'oct-28-primary', date: '2025-10-29', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'oct-28-secondary', date: '2025-10-29', ra: 'Terry', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'oct-29-primary', date: '2025-10-30', ra: 'Brooke', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'oct-29-secondary', date: '2025-10-30', ra: 'Sarah', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'oct-30-primary', date: '2025-10-31', ra: 'Caroline', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'oct-30-secondary', date: '2025-10-31', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'oct-31-primary', date: '2025-11-01', ra: 'Abigel', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'oct-31-secondary', date: '2025-11-01', ra: 'Sarah', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },

            // November 2025
            { id: 'nov-1-primary', date: '2025-11-02', ra: 'Smit', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'nov-1-secondary', date: '2025-11-02', ra: 'Caroline', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'nov-2-primary', date: '2025-11-03', ra: 'Terry', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'nov-2-secondary', date: '2025-11-03', ra: 'Mano', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'nov-3-primary', date: '2025-11-04', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'nov-3-secondary', date: '2025-11-04', ra: 'Ethan', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'nov-4-primary', date: '2025-11-05', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'nov-4-secondary', date: '2025-11-05', ra: 'Smit', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'nov-5-primary', date: '2025-11-06', ra: 'Caroline', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'nov-5-secondary', date: '2025-11-06', ra: 'A\'Maya', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'nov-6-primary', date: '2025-11-07', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'nov-6-secondary', date: '2025-11-07', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'nov-7-primary', date: '2025-11-08', ra: 'Sarah', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'nov-7-secondary', date: '2025-11-08', ra: 'A\'Maya', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'nov-8-primary', date: '2025-11-09', ra: 'Ethan', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'nov-8-secondary', date: '2025-11-09', ra: 'Smit', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'nov-9-primary', date: '2025-11-10', ra: 'Thanh', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'nov-9-secondary', date: '2025-11-10', ra: 'Terry', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'nov-10-primary', date: '2025-11-11', ra: 'Ethan', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'nov-10-secondary', date: '2025-11-11', ra: 'A\'Maya', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'nov-11-primary', date: '2025-11-12', ra: 'Terry', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'nov-11-secondary', date: '2025-11-12', ra: 'Abigel', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'nov-12-primary', date: '2025-11-13', ra: 'Brooke', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'nov-12-secondary', date: '2025-11-13', ra: 'A\'Maya', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'nov-13-primary', date: '2025-11-14', ra: 'Smit', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'nov-13-secondary', date: '2025-11-14', ra: 'Ethan', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'nov-14-primary', date: '2025-11-15', ra: 'A\'Maya', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'nov-14-secondary', date: '2025-11-15', ra: 'Brooke', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'nov-15-primary', date: '2025-11-16', ra: 'Mano', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'nov-15-secondary', date: '2025-11-16', ra: 'Brooke', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'nov-16-primary', date: '2025-11-17', ra: 'Ethan', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'nov-16-secondary', date: '2025-11-17', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'nov-17-primary', date: '2025-11-18', ra: 'Caroline', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'nov-17-secondary', date: '2025-11-18', ra: 'Smit', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'nov-18-primary', date: '2025-11-19', ra: 'Abigel', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'nov-18-secondary', date: '2025-11-19', ra: 'Thanh', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'nov-19-primary', date: '2025-11-20', ra: 'Brooke', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'nov-19-secondary', date: '2025-11-20', ra: 'Caroline', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'nov-20-primary', date: '2025-11-21', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'nov-20-secondary', date: '2025-11-21', ra: 'Smit', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'nov-21-primary', date: '2025-11-22', ra: 'Terry', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'nov-21-secondary', date: '2025-11-22', ra: 'Brooke', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'nov-22-primary', date: '2025-11-23', ra: 'Mano', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'nov-22-secondary', date: '2025-11-23', ra: 'A\'Maya', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'nov-23-primary', date: '2025-11-24', ra: 'Ethan', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'nov-23-secondary', date: '2025-11-24', ra: 'Brooke', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'nov-24-primary', date: '2025-11-25', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'nov-24-secondary', date: '2025-11-25', ra: 'Sarah', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
                        { id: 'nov-25-primary', date: '2025-11-26', ra: 'Caroline', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'nov-25-secondary', date: '2025-11-26', ra: 'Brooke', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },

            // December 2025
            { id: 'dec-1-primary', date: '2025-12-02', ra: 'Abigel', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'dec-1-secondary', date: '2025-12-02', ra: 'Smit', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'dec-2-primary', date: '2025-12-03', ra: 'Thanh', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'dec-2-secondary', date: '2025-12-03', ra: 'Abigel', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'dec-3-primary', date: '2025-12-04', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'dec-3-secondary', date: '2025-12-04', ra: 'A\'Maya', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'dec-4-primary', date: '2025-12-05', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'dec-4-secondary', date: '2025-12-05', ra: 'Mano', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'dec-5-primary', date: '2025-12-06', ra: 'Brooke', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'dec-5-secondary', date: '2025-12-06', ra: 'A\'Maya', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' },
            { id: 'dec-6-primary', date: '2025-12-07', ra: 'Ethan', type: 'primary', notes: 'Saturday: 7:00pm to 7:00pm Sunday' },
            { id: 'dec-6-secondary', date: '2025-12-07', ra: 'Abigel', type: 'secondary', notes: 'Saturday: 10:00pm to 10:00pm Sunday' },
            { id: 'dec-7-primary', date: '2025-12-08', ra: 'Sarah', type: 'primary', notes: 'Sunday: 7:00pm-8:30am' },
            { id: 'dec-7-secondary', date: '2025-12-08', ra: 'Mano', type: 'secondary', notes: 'Sunday: 10:00pm-8:30am' },
            { id: 'dec-8-primary', date: '2025-12-09', ra: 'A\'Maya', type: 'primary', notes: 'Monday: 7:00pm-8:30am' },
            { id: 'dec-8-secondary', date: '2025-12-09', ra: 'Caroline', type: 'secondary', notes: 'Monday: 10:00pm-8:30am' },
            { id: 'dec-9-primary', date: '2025-12-10', ra: 'Smit', type: 'primary', notes: 'Tuesday: 7:00pm-8:30am' },
            { id: 'dec-9-secondary', date: '2025-12-10', ra: 'Abigel', type: 'secondary', notes: 'Tuesday: 10:00pm-8:30am' },
            { id: 'dec-10-primary', date: '2025-12-11', ra: 'Sarah', type: 'primary', notes: 'Wednesday: 7:00pm-8:30am' },
            { id: 'dec-10-secondary', date: '2025-12-11', ra: 'A\'Maya', type: 'secondary', notes: 'Wednesday: 10:00pm-8:30am' },
            { id: 'dec-11-primary', date: '2025-12-12', ra: 'Elizabeth', type: 'primary', notes: 'Thursday: 7:00pm-8:30am' },
            { id: 'dec-11-secondary', date: '2025-12-12', ra: 'Thanh', type: 'secondary', notes: 'Thursday: 10:00pm-8:30am' },
            { id: 'dec-12-primary', date: '2025-12-13', ra: 'Caroline', type: 'primary', notes: 'Friday: 7:00pm to 7:00pm Saturday' },
            { id: 'dec-12-secondary', date: '2025-12-13', ra: 'Ethan', type: 'secondary', notes: 'Friday: 10:00pm to 10:00pm Saturday' }
        ];
    }

            populateFilters() {
                const raSelect = document.getElementById('shiftRA');
                const raFilterSelect = document.getElementById('raSelect');
                
                // Clear existing options
                raSelect.innerHTML = '<option value="">Select RA</option>';
                raFilterSelect.innerHTML = '<option value="all">All RAs</option>';
                
                // Extract unique RA names from shifts data
                const uniqueRAs = [...new Set(this.shifts.map(shift => shift.ra))].sort();
                this.ras = uniqueRAs;
                
                // Populate RA select in modal
                uniqueRAs.forEach(ra => {
                    const modalOption = document.createElement('option');
                    modalOption.value = ra;
                    modalOption.textContent = ra;
                    raSelect.appendChild(modalOption);
                    
                    // Also populate the RA filter dropdown
                    const filterOption = document.createElement('option');
                    filterOption.value = ra;
                    filterOption.textContent = ra;
                    raFilterSelect.appendChild(filterOption);
                });
            }

            setupEventListeners() {
                // Add shift form submission
                document.getElementById('addShiftForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.addShift();
                });

                // Month dropdown change event
                const monthSelect = document.getElementById('monthSelect');
                if (monthSelect) {
                    monthSelect.addEventListener('change', (e) => {
                        this.selectedMonth = e.target.value;
                        this.renderSchedule();
                    });
                }

                // RA dropdown change event
                const raSelect = document.getElementById('raSelect');
                if (raSelect) {
                    raSelect.addEventListener('change', (e) => {
                        this.selectedRA = e.target.value;
                        this.renderSchedule();
                    });
                }

                // Close modal when clicking outside
                window.addEventListener('click', (e) => {
                    const addShiftModal = document.getElementById('addShiftModal');
                    if (e.target === addShiftModal) {
                        this.closeAddShiftModal();
                    }
                });
            }

            addShift() {
                const date = document.getElementById('shiftDate').value;
                const ra = document.getElementById('shiftRA').value;
                const type = document.getElementById('shiftType').value;
                const notes = document.getElementById('shiftNotes').value;

                if (!date || !ra || !type) {
                    alert('Please fill in all required fields');
                    return;
                }

                const newShift = {
                    id: `shift-${Date.now()}`,
                    date: date,
                    ra: ra,
                    type: type,
                    notes: notes
                };

                this.shifts.push(newShift);
                this.populateFilters(); // Refresh filters in case we added a new RA
                this.renderSchedule();
                this.renderRASummary();
                this.closeAddShiftModal();
                this.resetForm();
            }

            resetForm() {
                document.getElementById('addShiftForm').reset();
            }

            renderSchedule() {
                const scheduleGrid = document.getElementById('scheduleGrid');
                scheduleGrid.innerHTML = '';

                if (this.shifts.length === 0) {
                    scheduleGrid.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #718096;">
                            <i class="fas fa-calendar-plus" style="font-size: 3rem; margin-bottom: 20px; color: #a0aec0;"></i>
                            <h3 style="margin-bottom: 15px; color: #4a5568;">No Schedule Data</h3>
                            <p style="margin-bottom: 25px; font-size: 1.1rem;">Your RA duty schedule is currently empty.</p>
                            <button class="btn btn-primary" onclick="openAddShiftModal()">
                                <i class="fas fa-plus"></i> Add First Shift
                            </button>
                        </div>
                    `;
                    return;
                }

                // Group shifts by month
                const monthlyShifts = this.groupShiftsByMonth();
                
                // Filter by selected month
                let selectedMonthShifts = monthlyShifts[this.selectedMonth] || [];
                
                // Filter by RA if a specific RA is selected
                if (this.selectedRA !== 'all') {
                    selectedMonthShifts = selectedMonthShifts.filter(shift => shift.ra === this.selectedRA);
                }

                if (selectedMonthShifts.length === 0) {
                    const monthNames = {
                        '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December'
                    };
                    const monthName = monthNames[this.selectedMonth];
                    const raFilter = this.selectedRA === 'all' ? '' : ` for ${this.selectedRA}`;
                    
                    scheduleGrid.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #718096;">
                            <i class="fas fa-calendar" style="font-size: 3rem; margin-bottom: 20px; color: #a0aec0;"></i>
                            <h3 style="margin-bottom: 15px; color: #4a5568;">No Shifts Found</h3>
                            <p style="margin-bottom: 25px; font-size: 1.1rem;">No shifts scheduled for ${monthName}${raFilter}.</p>
                        </div>
                    `;
                    return;
                }

                const monthCard = this.createMonthCard(this.selectedMonth, selectedMonthShifts);
                scheduleGrid.appendChild(monthCard);
            }

            groupShiftsByMonth() {
                const monthlyShifts = {};
                
                this.shifts.forEach(shift => {
                    const month = new Date(shift.date).getMonth() + 1;
                    if (!monthlyShifts[month]) {
                        monthlyShifts[month] = [];
                    }
                    monthlyShifts[month].push(shift);
                });

                return monthlyShifts;
            }

            createMonthCard(month, shifts) {
                const monthCard = document.createElement('div');
                monthCard.className = 'month-card';
                
                const monthNames = {
                    '8': 'August', '9': 'September', '10': 'October', '11': 'November', '12': 'December'
                };
                
                const monthName = monthNames[month];
                const primaryCount = shifts.filter(s => s.type === 'primary').length;
                const secondaryCount = shifts.filter(s => s.type === 'secondary').length;
                
                monthCard.innerHTML = `
                    <div class="month-header">
                        <h3>${monthName}</h3>
                        <div class="month-stats">
                            ${primaryCount} Primary, ${secondaryCount} Secondary
                        </div>
                    </div>
                    ${this.renderMonthShifts(shifts)}
                `;
                
                return monthCard;
            }

            renderMonthShifts(shifts) {
                if (shifts.length === 0) {
                    return '<p style="color: #718096; font-style: italic; text-align: center; padding: 20px;">No shifts scheduled</p>';
                }

                // Sort shifts by date
                const sortedShifts = shifts.sort((a, b) => new Date(a.date) - new Date(b.date));
                
                return sortedShifts.map(shift => {
                    const date = new Date(shift.date);
                    const formattedDate = date.toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                    });
                    
                    return `
                        <div class="shift-item">
                            <div class="shift-date">${formattedDate}</div>
                            <div class="shift-info">
                                <span class="shift-ra">${shift.ra}</span>
                                <span class="shift-type ${shift.type}">${shift.type}</span>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            renderRASummary() {
                const raGrid = document.getElementById('raGrid');
                raGrid.innerHTML = '';

                if (this.ras.length === 0) {
                    raGrid.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: #718096;">
                            <i class="fas fa-users" style="font-size: 2.5rem; margin-bottom: 15px; color: #a0aec0;"></i>
                            <h3 style="margin-bottom: 10px; color: #4a5568;">No RAs Assigned</h3>
                            <p style="font-size: 1rem;">RA information will appear here once you add shifts.</p>
                        </div>
                    `;
                    return;
                }

                // Filter RAs based on selected RA filter
                let rasToShow = this.ras;
                if (this.selectedRA !== 'all') {
                    rasToShow = [this.selectedRA];
                }

                rasToShow.forEach(ra => {
                    const raShifts = this.shifts.filter(shift => shift.ra === ra);
                    const primaryShifts = raShifts.filter(shift => shift.type === 'primary');
                    const secondaryShifts = raShifts.filter(shift => shift.type === 'secondary');
                    
                    const raCard = document.createElement('div');
                    raCard.className = 'ra-card';
                    
                    raCard.innerHTML = `
                        <div class="ra-header">
                            <div class="ra-name">${ra}</div>
                            <div class="ra-total">${raShifts.length}</div>
                        </div>
                        <div class="ra-stats">
                            <div class="ra-stat">
                                <div class="ra-stat-number">${primaryShifts.length}</div>
                                <div class="ra-stat-label">Primary</div>
                            </div>
                            <div class="ra-stat">
                                <div class="ra-stat-number">${secondaryShifts.length}</div>
                                <div class="ra-stat-label">Secondary</div>
                            </div>
                        </div>
                        <div class="ra-shifts">
                            ${raShifts.length} shifts assigned across all months
                        </div>
                    `;
                    
                    raGrid.appendChild(raCard);
                });
            }

            closeAddShiftModal() {
                document.getElementById('addShiftModal').style.display = 'none';
            }
        }

        // Modal functions
        function openAddShiftModal() {
            document.getElementById('addShiftModal').style.display = 'block';
            document.getElementById('shiftDate').focus();
        }

        function closeAddShiftModal() {
            document.getElementById('addShiftModal').style.display = 'none';
        }

        // Initialize the application
        let app;
        document.addEventListener('DOMContentLoaded', () => {
            app = new RAScheduleApp();
        });