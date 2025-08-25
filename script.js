class RAScheduleApp {
    constructor() {
        this.ras = [];
        this.shifts = [];
        this.selectedMonth = '8';
        this.selectedRA = 'all';
        this.isLoading = false;

        this.init();
    }

    async init() {
        this.showLoading();
        await this.loadShifts();
        this.populateFilters();
        this.renderSchedule();
        this.renderRASummary();
        this.setupEventListeners();
        this.hideLoading();
        this.initializeAnimations();
    }

    showLoading() {
        this.isLoading = true;
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'flex';
    }

    hideLoading() {
        this.isLoading = false;
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'none';
    }

    async loadShifts() {
        if (this.shifts.length > 0) return;

        try {
            // Replace with your actual Google Apps Script web app link
            const response = await fetch("https://script.google.com/macros/s/AKfycbxvHukr1dqdaEKx5D1cGGvXiD6J9ynI1oChFcdKCZPiI3gHkuJm0vuq86WRoXLOx8MRdQ/exec");
            const data = await response.json();

            // Convert JSON into your internal shift format
            this.shifts = data.flatMap(entry => {
                let dateParts = entry.date.split(" ");
                let month = dateParts[0];
                let day = parseInt(dateParts[1]);

                // Map month names to numbers
                const monthMap = {
                    "August": "08",
                    "September": "09",
                    "October": "10",
                    "November": "11",
                    "December": "12"
                };

                let monthNum = monthMap[month];
                let year = "2025"; // Current year
                let isoDate = `${year}-${monthNum}-${String(day).padStart(2, '0')}`;

                let shifts = [];
                if (entry.primaryRA) {
                    shifts.push({
                        id: `${month.toLowerCase()}-${day}-primary`,
                        date: isoDate,
                        ra: entry.primaryRA,
                        type: "primary",
                        notes: ""
                    });
                }
                if (entry.secondaryRA) {
                    shifts.push({
                        id: `${month.toLowerCase()}-${day}-secondary`,
                        date: isoDate,
                        ra: entry.secondaryRA,
                        type: "secondary",
                        notes: ""
                    });
                }
                return shifts;
            });

        } catch (error) {
            console.error("Error loading shifts:", error);
            // fallback to default shifts if fetch fails
            this.shifts = this.getDefaultShifts();
        }
    }
    
    populateFilters() {
        const raFilterSelect = document.getElementById('raSelect');

        // Clear existing options
        raFilterSelect.innerHTML = '<option value="all">All RAs</option>';

        // Define entries to exclude (special duties, not actual RA names)
        const excludeEntries = [
            'Fall Break Duty',
            'Thanksgiving Break duty', 
            'Thanksgiving Break Duty',
            'FINALS'
        ];

        // Extract unique RA names from shifts data, excluding special duties
        const uniqueRAs = [...new Set(this.shifts
            .map(shift => shift.ra)
            .filter(ra => !excludeEntries.includes(ra))
        )].sort();
        this.ras = uniqueRAs;

        // Populate the RA filter dropdown
        uniqueRAs.forEach(ra => {
            const filterOption = document.createElement('option');
            filterOption.value = ra;
            filterOption.textContent = ra;
            raFilterSelect.appendChild(filterOption);
        });
    }

    setupEventListeners() {
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
                this.renderRASummary();
            });
        }

        // Navigation smooth scrolling (ignore external links)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.classList.contains('external-link')) {
                    return; // allow default behavior
                }
                const href = link.getAttribute('href') || '';
                if (!href.startsWith('#')) {
                    return; // not an internal anchor
                }
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.month-card, .ra-card, .section-header').forEach(el => {
            observer.observe(el);
        });
    }

    initializeAnimations() {
        // Animation initialization can be added here if needed
    }

    renderSchedule() {
        const scheduleGrid = document.getElementById('scheduleGrid');
        scheduleGrid.innerHTML = '';

        if (this.shifts.length === 0) {
            scheduleGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                    <div class="empty-icon">
                        <i class="fas fa-calendar-plus"></i>
                    </div>
                    <h3>No Schedule Data</h3>
                    <p>Your RA duty schedule is currently empty.</p>
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
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
                    <div class="empty-icon">
                        <i class="fas fa-calendar"></i>
                    </div>
                    <h3>No Shifts Found</h3>
                    <p>No shifts scheduled for ${monthName}${raFilter}.</p>
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
            // Parse the month directly from the ISO string to avoid timezone shifts
            const parts = shift.date.split('-');
            const monthFromString = parseInt(parts[1], 10); // 1-12
            const key = monthFromString; // keep numeric key
            if (!monthlyShifts[key]) {
                monthlyShifts[key] = [];
            }
            monthlyShifts[key].push(shift);
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
            return '<p class="no-shifts">No shifts scheduled</p>';
        }

        // Sort shifts by date (parse as local by appending T00:00:00)
        const sortedShifts = shifts.sort((a, b) => new Date(a.date + 'T00:00:00') - new Date(b.date + 'T00:00:00'));

        return sortedShifts.map(shift => {
            // Format date using local time to avoid off-by-one from UTC parsing
            const date = new Date(shift.date + 'T00:00:00');
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

        // Define entries to exclude from RA summary
        const excludeEntries = [
            'Fall Break Duty',
            'Thanksgiving Break duty', 
            'Thanksgiving Break Duty',
            'FINALS'
        ];

        // Filter out special duties from RAs list for display
        const filteredRAs = this.ras.filter(ra => !excludeEntries.includes(ra));

        if (filteredRAs.length === 0) {
            raGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem 2rem;">
                    <div class="empty-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>No RAs Assigned</h3>
                    <p>RA information will appear here once you add shifts.</p>
                </div>
            `;
            return;
        }

        // Filter RAs based on selected RA filter
        let rasToShow = filteredRAs;
        if (this.selectedRA !== 'all' && !excludeEntries.includes(this.selectedRA)) {
            rasToShow = [this.selectedRA];
        }

        rasToShow.forEach(ra => {
            const raShifts = this.shifts.filter(shift => shift.ra === ra);
            const totalShifts = raShifts.length;

            const originalPrimary = raShifts.filter(shift => shift.type === 'primary').length;
            const originalSecondary = raShifts.filter(shift => shift.type === 'secondary').length;
            
            // Get current date and time for comparison
            const now = new Date();
            
            // Function to check if a shift is completed based on duty schedule
            const isShiftCompleted = (shift) => {
                const shiftDate = new Date(shift.date + "T00:00:00");
                const dayOfWeek = shiftDate.getDay();

                let shiftStart = new Date(shiftDate);
                let shiftEnd = new Date(shiftDate);

                if (shift.type === "primary") {
                    if (dayOfWeek >= 0 && dayOfWeek <= 4) {
                        // Sunday–Thursday: 7:00 PM → next day 8:30 AM
                        shiftStart.setHours(19, 0, 0, 0);
                        shiftEnd = new Date(shiftStart);
                        shiftEnd.setDate(shiftEnd.getDate() + 1);
                        shiftEnd.setHours(8, 30, 0, 0);
                    } else {
                        // Fri or Sat: 7:00 PM → next day 7:00 PM
                        shiftStart.setHours(19, 0, 0, 0);
                        shiftEnd = new Date(shiftStart);
                        shiftEnd.setDate(shiftEnd.getDate() + 1);
                        shiftEnd.setHours(19, 0, 0, 0);
                    }
                } else if (shift.type === "secondary") {
                    if (dayOfWeek >= 0 && dayOfWeek <= 4) {
                        // Sunday–Thursday: 10:00 PM → next day 8:30 AM
                        shiftStart.setHours(22, 0, 0, 0);
                        shiftEnd = new Date(shiftStart);
                        shiftEnd.setDate(shiftEnd.getDate() + 1);
                        shiftEnd.setHours(8, 30, 0, 0);
                    } else {
                        // Fri or Sat: 10:00 PM → next day 10:00 PM
                        shiftStart.setHours(22, 0, 0, 0);
                        shiftEnd = new Date(shiftStart);
                        shiftEnd.setDate(shiftEnd.getDate() + 1);
                        shiftEnd.setHours(22, 0, 0, 0);
                    }
                }

                // Now check against current EST time
                const now = new Date();
                const estNow = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

                return estNow >= shiftEnd;
            };
            
            // Separate shifts into completed and remaining
            const remainingShifts = raShifts.filter(shift => !isShiftCompleted(shift));
            const remainingPrimary = remainingShifts.filter(shift => shift.type === 'primary');
            const remainingSecondary = remainingShifts.filter(shift => shift.type === 'secondary');

            const raCard = document.createElement('div');
            raCard.className = 'ra-card';

            raCard.innerHTML = `
                <div class="ra-header">
                    <div class="ra-name">${ra}</div>
                    <div class="ra-total">Total Shifts: ${totalShifts}</div>
                </div>
                <div class="ra-stats">
                    <div class="ra-stat">
                        <div class="ra-stat-number">${originalPrimary - remainingPrimary.length}/${originalPrimary}</div>
                        <div class="ra-stat-label">Primary</div>
                    </div>
                    <div class="ra-stat">
                        <div class="ra-stat-number">${originalSecondary - remainingSecondary.length}/${originalSecondary}</div>
                        <div class="ra-stat-label">Secondary</div>
                    </div>
                </div>
                <div class="ra-shifts">
                    <div class="ra-total">${remainingShifts.length} shifts remaining in total</div>
                </div>
            `;

            raGrid.appendChild(raCard);
        });
    }

    // Add this method if it's missing (fallback data)
    getDefaultShifts() {
        return [
            // Add some default shifts here if needed for testing
            // Example:
            // {
            //     id: 'default-1',
            //     date: '2025-08-01',
            //     ra: 'Sample RA',
            //     type: 'primary',
            //     notes: ''
            // }
        ];
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', async () => {
    app = new RAScheduleApp();
});

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .empty-state {
        color: #64748b;
    }

    .empty-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
        color: #94a3b8;
    }

    .empty-state h3 {
        margin-bottom: 1rem;
        color: #475569;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .empty-state p {
        margin-bottom: 2rem;
        font-size: 1.125rem;
    }

    .no-shifts {
        color: #64748b;
        font-style: italic;
        text-align: center;
        padding: 2rem;
    }

    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);