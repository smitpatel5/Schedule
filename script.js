class RAScheduleApp {
 constructor() {
    this.ras = [];
    this.shifts = [];
    
    // Automatically select the current month
    this.selectedMonth = this.getCurrentMonth();
    this.selectedRA = 'all';
    this.currentView = 'list';
    
    // Set calendar date to current month as well
    const now = new Date();
    this.currentCalendarDate = new Date(now.getFullYear(), now.getMonth(), 1);
    
    this.isLoading = false;
    
    // Shift swap state
    this.swapState = {
        currentStep: 1,
        selectedSelfRA: null,
        selectedYourShift: null,
        selectedTargetRA: null,
        selectedTargetShift: null,
        raPermission: false,
        rdPermission: false
    };

    this.init();
}

// Add this new method to get the current month
getCurrentMonth() {
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11, we need 1-12
    
    // Only return months that are available in your schedule (August-December)
    const availableMonths = [8, 9, 10, 11, 12]; // August through December
    
    if (availableMonths.includes(currentMonth)) {
        return currentMonth.toString();
    } else {
        // If current month is not in schedule range, default to the first available month
        return '8'; // August
    }
}


async init() {
    this.showLoading();
    await this.loadShifts();
    this.populateFilters();
    
    // Set the month dropdown to the selected month
    this.setMonthDropdown();
    
    this.renderSchedule();
    this.renderRASummary();
    this.renderCalendar();
    this.setupEventListeners();
    this.hideLoading();
    this.initializeAnimations();
    this.initializeSwapFeature();
}

    showLoading() {
        this.isLoading = true;
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'flex';
    }

    setMonthDropdown() {
    const monthSelect = document.getElementById('monthSelect');
    if (monthSelect) {
        monthSelect.value = this.selectedMonth;
    }
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
            const response = await fetch("https://script.google.com/macros/s/AKfycbyprKhudlfA4e2fjcdRuA-wYMRfdgB4nZl3uNIMIqDO0xeYQcIfovqihUKK1yghTRPdpA/exec");
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
                this.currentCalendarDate = new Date(2025, parseInt(e.target.value) - 1, 1);
                this.renderSchedule();
                this.renderCalendar();
            });
        }

        // RA dropdown change event
        const raSelect = document.getElementById('raSelect');
        if (raSelect) {
            raSelect.addEventListener('change', (e) => {
                this.selectedRA = e.target.value;
                this.renderSchedule();
                this.renderRASummary();
                this.renderCalendar();
            });
        }

        // View toggle buttons
        const listViewBtn = document.getElementById('listViewBtn');
        const calendarViewBtn = document.getElementById('calendarViewBtn');
        
        if (listViewBtn && calendarViewBtn) {
            listViewBtn.addEventListener('click', () => {
                this.switchView('list');
            });
            
            calendarViewBtn.addEventListener('click', () => {
                this.switchView('calendar');
            });
        }

        // Calendar navigation
        const prevMonthBtn = document.getElementById('prevMonthBtn');
        const nextMonthBtn = document.getElementById('nextMonthBtn');
        
        if (prevMonthBtn && nextMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                this.changeCalendarMonth(-1);
            });
            
            nextMonthBtn.addEventListener('click', () => {
                this.changeCalendarMonth(1);
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

    initializeSwapFeature() {
        // Swap navigation buttons
        const prevStepBtn = document.getElementById('prevStepBtn');
        const nextStepBtn = document.getElementById('nextStepBtn');

        if (prevStepBtn) {
            prevStepBtn.addEventListener('click', () => {
                this.previousSwapStep();
            });
        }

        if (nextStepBtn) {
            nextStepBtn.addEventListener('click', () => {
                this.nextSwapStep();
            });
        }

        // Permission checkboxes - these now trigger instant swap
        const raPermissionCheck = document.getElementById('raPermissionCheck');
        const rdPermissionCheck = document.getElementById('rdPermissionCheck');
        
        if (raPermissionCheck && rdPermissionCheck) {
            raPermissionCheck.addEventListener('change', () => {
                this.swapState.raPermission = raPermissionCheck.checked;
                this.checkAndExecuteSwap();
            });

            rdPermissionCheck.addEventListener('change', () => {
                this.swapState.rdPermission = rdPermissionCheck.checked;
                this.checkAndExecuteSwap();
            });
        }

        // Back to step 4 button
        const backToStep4Btn = document.getElementById('backToStep4');
        if (backToStep4Btn) {
            backToStep4Btn.addEventListener('click', () => {
                this.goToSwapStep(4);
            });
        }

        // Success modal handlers
        const closeSuccessModal = document.getElementById('closeSuccessModal');
        const startNewSwap = document.getElementById('startNewSwap');

        if (closeSuccessModal) {
            closeSuccessModal.addEventListener('click', () => {
                this.hideSuccessModal();
            });
        }

        if (startNewSwap) {
            startNewSwap.addEventListener('click', () => {
                this.resetSwapProcess();
                this.hideSuccessModal();
            });
        }

        // Initialize the swap interface
        this.renderSwapStep();
    }

    nextSwapStep() {
        if (this.swapState.currentStep < 5) {
            this.swapState.currentStep++;
            this.renderSwapStep();
        }
    }

    previousSwapStep() {
        if (this.swapState.currentStep > 1) {
            this.swapState.currentStep--;
            this.renderSwapStep();
        }
    }

    goToSwapStep(step) {
        this.swapState.currentStep = step;
        this.renderSwapStep();
    }

    renderSwapStep() {
        // Update progress indicators
        document.querySelectorAll('.progress-step').forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            step.classList.remove('active', 'completed');
            
            if (stepNum === this.swapState.currentStep) {
                step.classList.add('active');
            } else if (stepNum < this.swapState.currentStep) {
                step.classList.add('completed');
            }
        });

        // Show/hide steps
        document.querySelectorAll('.swap-step').forEach(step => {
            step.classList.remove('active');
        });
        
        const currentStepElement = document.getElementById(`step${this.swapState.currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }

        // Update navigation buttons
        this.updateSwapNavigation();

        // Render step-specific content
        switch (this.swapState.currentStep) {
            case 1:
                this.renderSelfSelection();
                break;
            case 2:
                this.renderYourShifts();
                break;
            case 3:
                this.renderTargetRASelection();
                break;
            case 4:
                this.renderTargetShifts();
                break;
            case 5:
                this.renderSwapConfirmation();
                break;
        }
    }

    renderSelfSelection() {
        const grid = document.getElementById('selfSelectionGrid');
        if (!grid) return;

        grid.innerHTML = '';

        this.ras.forEach(ra => {
            const raShifts = this.shifts.filter(shift => shift.ra === ra);
            const option = document.createElement('div');
            option.className = 'ra-option';
            if (this.swapState.selectedSelfRA === ra) {
                option.classList.add('selected');
            }

            option.innerHTML = `
                <h4>${ra}</h4>
                <div class="shift-count">${raShifts.length} shifts</div>
            `;

            option.addEventListener('click', () => {
                this.swapState.selectedSelfRA = ra;
                this.renderSelfSelection();
                this.updateSwapNavigation();
            });

            grid.appendChild(option);
        });
    }

    renderYourShifts() {
        const grid = document.getElementById('yourShiftsGrid');
        const subtitle = document.getElementById('step2Subtitle');
        
        if (!grid || !this.swapState.selectedSelfRA) return;

        subtitle.textContent = `Choose the shift you want to swap, ${this.swapState.selectedSelfRA}`;
        grid.innerHTML = '';

        const yourShifts = this.shifts.filter(shift => shift.ra === this.swapState.selectedSelfRA);

        if (yourShifts.length === 0) {
            grid.innerHTML = '<p class="empty-state">No shifts found for the selected RA.</p>';
            return;
        }

        yourShifts.forEach(shift => {
            const option = document.createElement('div');
            option.className = 'shift-option';
            if (this.swapState.selectedYourShift?.id === shift.id) {
                option.classList.add('selected');
            }

            const date = new Date(shift.date + 'T00:00:00');
            const formattedDate = date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });

            const shiftTimes = this.getShiftTimes(shift);

            option.innerHTML = `
                <div class="shift-date-display">${formattedDate}</div>
                <div class="shift-details">
                    <span class="shift-type-display ${shift.type}">${shift.type}</span>
                    <span class="shift-time">${shiftTimes}</span>
                </div>
            `;

            option.addEventListener('click', () => {
                this.swapState.selectedYourShift = shift;
                this.renderYourShifts();
                this.updateSwapNavigation();
            });

            grid.appendChild(option);
        });
    }

    renderTargetRASelection() {
        const grid = document.getElementById('targetSelectionGrid');
        if (!grid) return;

        grid.innerHTML = '';

        // Filter out the selected self RA
        const otherRAs = this.ras.filter(ra => ra !== this.swapState.selectedSelfRA);

        otherRAs.forEach(ra => {
            const raShifts = this.shifts.filter(shift => shift.ra === ra);
            const option = document.createElement('div');
            option.className = 'ra-option';
            if (this.swapState.selectedTargetRA === ra) {
                option.classList.add('selected');
            }

            option.innerHTML = `
                <h4>${ra}</h4>
                <div class="shift-count">${raShifts.length} shifts available</div>
            `;

            option.addEventListener('click', () => {
                this.swapState.selectedTargetRA = ra;
                this.renderTargetRASelection();
                this.updateSwapNavigation();
            });

            grid.appendChild(option);
        });
    }

    renderTargetShifts() {
        const grid = document.getElementById('targetShiftsGrid');
        const subtitle = document.getElementById('step4Subtitle');
        
        if (!grid || !this.swapState.selectedTargetRA) return;

        subtitle.textContent = `Choose which of ${this.swapState.selectedTargetRA}'s shifts you want`;
        grid.innerHTML = '';

        const targetShifts = this.shifts.filter(shift => shift.ra === this.swapState.selectedTargetRA);

        if (targetShifts.length === 0) {
            grid.innerHTML = '<p class="empty-state">No shifts found for the selected RA.</p>';
            return;
        }

        targetShifts.forEach(shift => {
            const option = document.createElement('div');
            option.className = 'shift-option';
            if (this.swapState.selectedTargetShift?.id === shift.id) {
                option.classList.add('selected');
            }

            const date = new Date(shift.date + 'T00:00:00');
            const formattedDate = date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });

            const shiftTimes = this.getShiftTimes(shift);

            option.innerHTML = `
                <div class="shift-date-display">${formattedDate}</div>
                <div class="shift-details">
                    <span class="shift-type-display ${shift.type}">${shift.type}</span>
                    <span class="shift-time">${shiftTimes}</span>
                </div>
            `;

            option.addEventListener('click', () => {
                this.swapState.selectedTargetShift = shift;
                this.renderTargetShifts();
                this.updateSwapNavigation();
            });

            grid.appendChild(option);
        });
    }

    renderSwapConfirmation() {
    const yourShiftSummary = document.getElementById('yourShiftSummary');
    const targetShiftSummary = document.getElementById('targetShiftSummary');
    const targetRAName = document.getElementById('targetRAName');

    if (yourShiftSummary && this.swapState.selectedYourShift) {
        const date = new Date(this.swapState.selectedYourShift.date + 'T00:00:00');
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
        const shiftTimes = this.getShiftTimes(this.swapState.selectedYourShift);

        yourShiftSummary.innerHTML = `
            <div class="shift-date-display">${formattedDate}</div>
            <div class="shift-details">
                <span class="shift-type-display ${this.swapState.selectedYourShift.type}">
                    ${this.swapState.selectedYourShift.type}
                </span>
                <span class="shift-time">${shiftTimes}</span>
            </div>
        `;
    }

    if (targetShiftSummary && this.swapState.selectedTargetShift) {
        const date = new Date(this.swapState.selectedTargetShift.date + 'T00:00:00');
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
        const shiftTimes = this.getShiftTimes(this.swapState.selectedTargetShift);

        targetShiftSummary.innerHTML = `
            <div class="shift-date-display">${formattedDate}</div>
            <div class="shift-details">
                <span class="shift-type-display ${this.swapState.selectedTargetShift.type}">
                    ${this.swapState.selectedTargetShift.type}
                </span>
                <span class="shift-time">${shiftTimes}</span>
            </div>
        `;
    }

    if (targetRAName) {
        targetRAName.textContent = this.swapState.selectedTargetShift.ra;
    }

    // Reset checkboxes when confirmation page loads
    const raPermissionCheck = document.getElementById('raPermissionCheck');
    const rdPermissionCheck = document.getElementById('rdPermissionCheck');
    if (raPermissionCheck) {
        raPermissionCheck.checked = this.swapState.raPermission;
    }
    if (rdPermissionCheck) {
        rdPermissionCheck.checked = this.swapState.rdPermission;
    }
}
    
    getShiftTimes(shift) {
        const date = new Date(shift.date + 'T00:00:00');
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        
        if (shift.type === 'primary') {
            if (dayOfWeek >= 0 && dayOfWeek <= 4) { // Sunday-Thursday
                return '7:00 PM - 8:30 AM';
            } else { // Friday-Saturday
                return '7:00 PM - 7:00 PM';
            }
        } else if (shift.type === 'secondary') {
            if (dayOfWeek >= 0 && dayOfWeek <= 4) { // Sunday-Thursday
                return '10:00 PM - 8:30 AM';
            } else { // Friday-Saturday
                return '10:00 PM - 10:00 AM';
            }
        }
        return '';
    }

    updateSwapNavigation() {
        const prevBtn = document.getElementById('prevStepBtn');
        const nextBtn = document.getElementById('nextStepBtn');
        const swapNavigation = document.getElementById('swapNavigation');

        if (!prevBtn || !nextBtn) return;

        // Show/hide navigation for step 5 (it has its own buttons)
        if (this.swapState.currentStep === 5) {
            swapNavigation.style.display = 'none';
            return;
        } else {
            swapNavigation.style.display = 'flex';
        }

        // Previous button visibility
        prevBtn.style.display = this.swapState.currentStep > 1 ? 'inline-flex' : 'none';

        // Next button state
        let canProceed = false;
        switch (this.swapState.currentStep) {
            case 1:
                canProceed = !!this.swapState.selectedSelfRA;
                break;
            case 2:
                canProceed = !!this.swapState.selectedYourShift;
                break;
            case 3:
                canProceed = !!this.swapState.selectedTargetRA;
                break;
            case 4:
                canProceed = !!this.swapState.selectedTargetShift;
                break;
        }

        nextBtn.disabled = !canProceed;
    }

         // New method to check if both permissions are granted and execute swap instantly
checkAndExecuteSwap() {
    if (this.swapState.raPermission && this.swapState.rdPermission) {
        // Show loading immediately when both boxes are checked
        this.showSwapLoading();
        
        // Execute swap
        this.executeLocalSwap();
    }
}

showSwapLoading() {
    const step5 = document.getElementById('step5');
    if (!step5) return;
    
    // Add loading overlay to step 5
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'swapLoadingOverlay';
    loadingOverlay.className = 'swap-loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="swap-loading-content">
            <div class="swap-loading-spinner">
                <i class="fas fa-sync-alt fa-spin"></i>
            </div>
            <h3>Processing Swap...</h3>
            <p>Please wait while we update the schedule.</p>
        </div>
    `;
    
    step5.appendChild(loadingOverlay);
    
    // Disable checkboxes during processing
    const raCheckbox = document.getElementById('raPermissionCheck');
    const rdCheckbox = document.getElementById('rdPermissionCheck');
    if (raCheckbox) raCheckbox.disabled = true;
    if (rdCheckbox) rdCheckbox.disabled = true;
}

// Add this method to hide loading state
hideSwapLoading() {
    const loadingOverlay = document.getElementById('swapLoadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
    
    // Re-enable checkboxes
    const raCheckbox = document.getElementById('raPermissionCheck');
    const rdCheckbox = document.getElementById('rdPermissionCheck');
    if (raCheckbox) raCheckbox.disabled = false;
    if (rdCheckbox) rdCheckbox.disabled = false;
}



async executeLocalSwap() {
    console.log('Executing local swap...');
    
    try {
        // Sync to Google Sheets FIRST to ensure it works
        await this.syncSwapToGoogleSheets();
        console.log('Swap synced to Google Sheets successfully!');
        
        // Hide loading
        this.hideSwapLoading();
        
        // Only update local data after successful sync
        this.updateLocalShiftsAfterSwap();
        
        // Show success message
        this.showSuccessModal();
        
    } catch (error) {
        console.error('Failed to execute swap:', error);
        
        // Hide loading
        this.hideSwapLoading();
        
        // Show error modal instead of success
        this.showErrorModal('Failed to complete swap. Please try again or contact your RD.');
    }
}

showErrorModal(message) {
    const modal = document.getElementById('successModal');
    const modalHeader = modal.querySelector('.modal-header h3');
    const modalContent = modal.querySelector('.modal-content p');
    const modalIcon = modal.querySelector('.success-icon i');
    
    if (modalHeader) modalHeader.textContent = 'Swap Failed';
    if (modalIcon) {
        modalIcon.className = 'fas fa-exclamation-triangle';
        modalIcon.parentElement.style.color = '#EF4444'; // Red color for error
    }
    if (modalContent) {
        modalContent.textContent = message;
    }
    
    if (modal) {
        modal.style.display = 'flex';
    }
}

async syncSwapToGoogleSheets() {
    const swapData = {
        action: 'swap',
        yourShiftDate: this.swapState.selectedYourShift.date,
        yourShiftRA: this.swapState.selectedYourShift.ra,
        yourShiftType: this.swapState.selectedYourShift.type,
        targetShiftDate: this.swapState.selectedTargetShift.date,
        targetShiftRA: this.swapState.selectedTargetShift.ra,
        targetShiftType: this.swapState.selectedTargetShift.type
    };

    console.log('Syncing swap to Google Sheets:', swapData);
    
    try {
        // Try POST first (as your doPost function expects)
        console.log('Attempting POST request...');
        const response = await fetch("https://script.google.com/macros/s/AKfycbyprKhudlfA4e2fjcdRuA-wYMRfdgB4nZl3uNIMIqDO0xeYQcIfovqihUKK1yghTRPdpA/exec", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(swapData),
            mode: 'cors'
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        const result = await response.json();
        console.log('Google Sheets sync response:', result);
        
        if (!result.success) {
            throw new Error(result.error || 'Unknown error from Google Sheets');
        }
        
        return result;
        
    } catch (error) {
        console.error('POST request failed:', error);
        
        // Fallback: Try GET request (your doGet function does handle swap action)
        console.log('Trying GET request as fallback...');
        try {
            const params = new URLSearchParams(swapData);
            const getUrl = `https://script.google.com/macros/s/AKfycbyprKhudlfA4e2fjcdRuA-wYMRfdgB4nZl3uNIMIqDO0xeYQcIfovqihUKK1yghTRPdpA/exec?${params.toString()}`;
            
            console.log('GET URL:', getUrl);
            
            const getResponse = await fetch(getUrl, {
                method: 'GET',
                mode: 'cors'
            });

            console.log('GET Response status:', getResponse.status);
            
            if (!getResponse.ok) {
                throw new Error(`HTTP error! status: ${getResponse.status}`);
            }

            const getResult = await getResponse.json();
            console.log('GET Response:', getResult);
            
            if (!getResult.success) {
                throw new Error(getResult.error || 'Unknown error from Google Sheets');
            }
            
            return getResult;
            
        } catch (getError) {
            console.error('GET request also failed:', getError);
            throw new Error(`Both POST and GET requests failed. POST: ${error.message}, GET: ${getError.message}`);
        }
    }
}


 updateLocalShiftsAfterSwap() {
     // Update the local shifts array to reflect the swap
     const yourShift = this.shifts.find(shift => shift.id === this.swapState.selectedYourShift.id);
     const targetShift = this.shifts.find(shift => shift.id === this.swapState.selectedTargetShift.id);
     
     if (yourShift && targetShift) {
         // Swap the RAs
         const tempRA = yourShift.ra;
         yourShift.ra = targetShift.ra;
         targetShift.ra = tempRA;
         
         // Re-render the schedule and summary
         this.renderSchedule();
         this.renderRASummary();
         this.renderCalendar();
     }
 }

         showSuccessModal() {
         const modal = document.getElementById('successModal');
         const modalHeader = modal.querySelector('.modal-header h3');
         const modalContent = modal.querySelector('.modal-content p');
         const modalIcon = modal.querySelector('.success-icon i');
         
         if (modalHeader) modalHeader.textContent = 'Swap Completed Successfully!';
         if (modalIcon) {
             modalIcon.className = 'fas fa-check-circle';
             modalIcon.parentElement.style.color = '#10B981'; // Green color for success
         }
         if (modalContent) {
             modalContent.textContent = 'Your shift swap has been completed! The schedule has been updated with the new assignments.';
         }
         
         if (modal) {
             modal.style.display = 'flex';
         }
     }

    hideSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    resetSwapProcess() {
        this.swapState = {
            currentStep: 1,
            selectedSelfRA: null,
            selectedYourShift: null,
            selectedTargetRA: null,
            selectedTargetShift: null,
            raPermission: false,
            rdPermission: false
        };

        // Reset checkboxes
        const raPermissionCheck = document.getElementById('raPermissionCheck');
        const rdPermissionCheck = document.getElementById('rdPermissionCheck');
        if (raPermissionCheck) raPermissionCheck.checked = false;
        if (rdPermissionCheck) rdPermissionCheck.checked = false;

        this.renderSwapStep();
    }

    switchView(view) {
        this.currentView = view;
        
        const listView = document.getElementById('listView');
        const calendarView = document.getElementById('calendarView');
        const listViewBtn = document.getElementById('listViewBtn');
        const calendarViewBtn = document.getElementById('calendarViewBtn');
        
        if (view === 'list') {
            listView.style.display = 'block';
            calendarView.style.display = 'none';
            listViewBtn.classList.add('active');
            calendarViewBtn.classList.remove('active');
        } else {
            listView.style.display = 'none';
            calendarView.style.display = 'block';
            listViewBtn.classList.remove('active');
            calendarViewBtn.classList.add('active');
            this.renderCalendar();
        }
    }

    changeCalendarMonth(delta) {
        this.currentCalendarDate.setMonth(this.currentCalendarDate.getMonth() + delta);
        
        // Update the month selector to match
        const monthSelect = document.getElementById('monthSelect');
        const newMonth = (this.currentCalendarDate.getMonth() + 1).toString();
        if (monthSelect && monthSelect.querySelector(`option[value="${newMonth}"]`)) {
            this.selectedMonth = newMonth;
            monthSelect.value = newMonth;
        }
        
        this.renderCalendar();
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

renderCalendar() {
    const calendarTitle = document.getElementById('calendarTitle');
    const calendarDays = document.getElementById('calendarDays');
    
    if (!calendarTitle || !calendarDays) return;
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const year = this.currentCalendarDate.getFullYear();
    const month = this.currentCalendarDate.getMonth();
    
    calendarTitle.textContent = `${monthNames[month]} ${year}`;
    
    // Clear existing calendar days
    calendarDays.innerHTML = '';
    
    // Get first day of the month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day-cell empty-day';
        calendarDays.appendChild(emptyCell);
    }
    
    // Add current month's days only
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = this.createCalendarDayCell(day, false, year, month);
        calendarDays.appendChild(dayCell);
    }
    
    // Fill remaining cells if needed (optional - for visual balance)
    const totalCells = calendarDays.children.length;
    const remainingCells = Math.ceil(totalCells / 7) * 7 - totalCells;
    if (remainingCells > 0 && remainingCells < 7) {
        for (let i = 0; i < remainingCells; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day-cell empty-day';
            calendarDays.appendChild(emptyCell);
        }
    }
}

createCalendarDayCell(dayNum, isOtherMonth, year, month) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day-cell';
    
    if (isOtherMonth) {
        dayCell.classList.add('other-month');
        return dayCell; // Return empty cell for other months
    }
    
    // Check if this is today
    const today = new Date();
    const cellDate = new Date(year, month, dayNum);
    if (cellDate.toDateString() === today.toDateString()) {
        dayCell.classList.add('today');
    }
    
    // Create date string for finding shifts
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
    
    // Find shifts for this day
    let dayShifts = this.shifts.filter(shift => shift.date === dateStr);
    
    // Filter by selected RA if applicable
    if (this.selectedRA !== 'all') {
        dayShifts = dayShifts.filter(shift => shift.ra === this.selectedRA);
    }
    
    dayCell.innerHTML = `
        <div class="calendar-day-number">${dayNum}</div>
        <div class="calendar-shifts">
            ${this.renderCalendarShifts(dayShifts)}
        </div>
    `;
    
    return dayCell;
}

    renderCalendarShifts(shifts) {
        if (shifts.length === 0) return '';
        
        const maxVisible = 3;
        let html = '';
        
        for (let i = 0; i < Math.min(shifts.length, maxVisible); i++) {
            const shift = shifts[i];
            html += `
                <div class="calendar-shift ${shift.type}" title="${shift.ra} - ${shift.type} duty">
                    ${shift.ra}
                </div>
            `;
        }
        
        if (shifts.length > maxVisible) {
            html += `
                <div class="calendar-more" title="View more shifts">
                    +${shifts.length - maxVisible} more
                </div>
            `;
        }
        
        return html;
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
                        shiftEnd.setHours(12, 0, 0, 0);
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

    getRAColors() {
    return {
        // 'mano': '#3B82F6',      // Blue
        // 'smit': '#10B981',      // Emerald
        // 'terry': '#F59E0B',     // Amber
        // 'elizabeth': '#EF4444', // Red
        // 'thanh': '#8B5CF6',     // Violet
        // 'caroline': '#EC4899',  // Pink
        // 'abigel': '#06B6D4',    // Cyan
        // 'brooke': '#84CC16',    // Lime
        // "a'maya": '#F97316',    // Orange
        // 'sarah': '#8B5A2B',     // Brown
        // 'ethan': '#6366F1'      // Indigo

         'mano': '#63d963ff',      // Neon Green
        'smit': '#f6fa04ff',      // Dark Goldenrod (darkish yellow)
        'terry': '#8A2BE2',     // Blue Violet (purple)
        'elizabeth': '#9c6d4cff', // Saddle Brown
        'thanh': '#006400',     // Dark Green
        'caroline': '#FF00FF',  // Magenta
        'abigel': '#06B6D4',    // Cyan
        'brooke': '#808080',    // Gray
        "a'maya": '#F97316',    // Orange (unchanged)
        'sarah': '#0066CC',     // Blue
        'ethan': '#DC143C'      // Crimson Red
    };
}

// Get color for a specific RA
getRAColor(raName) {
    const colors = this.getRAColors();
    const normalizedName = raName.toLowerCase().trim();
    return colors[normalizedName] || '#6B7280'; // Default gray for unknown RAs
}

// Update the renderCalendarShifts method
renderCalendarShifts(shifts) {
    if (shifts.length === 0) return '';
    
    const maxVisible = 3;
    let html = '';
    
    for (let i = 0; i < Math.min(shifts.length, maxVisible); i++) {
        const shift = shifts[i];
        const color = this.getRAColor(shift.ra);
        const textColor = shift.ra.toLowerCase().trim() === 'smit' ? '#000000bb' : '#FFFFFF';
        html += `
            <div class="calendar-shift ${shift.type}" 
                 style="background-color: ${color}; color: ${textColor};" 
                 title="${shift.ra} - ${shift.type} duty">
                ${shift.ra}
            </div>
        `;
    }
    
    if (shifts.length > maxVisible) {
        html += `
            <div class="calendar-more" title="View more shifts">
                +${shifts.length - maxVisible} more
            </div>
        `;
    }
    
    return html;
}


// Optional: Add a legend showing RA colors
renderRALegend() {
    const legendContainer = document.querySelector('.legend-container');
    if (!legendContainer) return;
    
    const colors = this.getRAColors();
    const raLegendHTML = Object.entries(colors).map(([ra, color]) => `
        <div class="legend-item ra-legend">
            <div class="legend-color" style="background-color: ${color};"></div>
            <span>${ra.charAt(0).toUpperCase() + ra.slice(1)}</span>
        </div>
    `).join('');
    
    // Add RA legend after existing legend items
    legendContainer.insertAdjacentHTML('beforeend', raLegendHTML);
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

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    navToggle.innerHTML = navMenu.classList.contains("open")
      ? '<i class="fas fa-times"></i>'   // X icon
      : '<i class="fas fa-bars"></i>';  // hamburger icon
  });

  // Close menu when a link is clicked (mobile UX best practice)
  document.querySelectorAll(".nav-menu .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
});