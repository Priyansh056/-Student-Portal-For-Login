
        // Matrix Rain Effect
        function createMatrixRain() {
            const matrixBg = document.getElementById('matrixBg');
            const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
            
            for (let i = 0; i < 50; i++) {
                const span = document.createElement('span');
                span.className = 'matrix-text';
                span.textContent = chars[Math.floor(Math.random() * chars.length)];
                span.style.left = Math.random() * 100 + 'vw';
                span.style.animationDuration = (Math.random() * 3 + 2) + 's';
                span.style.animationDelay = Math.random() * 2 + 's';
                matrixBg.appendChild(span);
            }
        }

        // Dummy user data
        const users = {
            student: { email: 'student@portal.com', password: 'student123', name: 'John Doe', type: 'student' },
            teacher: { email: 'teacher@portal.com', password: 'teacher123', name: 'Dr. Smith', type: 'teacher' },
            admin: { email: 'admin@portal.com', password: 'admin123', name: 'Administrator', type: 'admin' }
        };

        // Show/Hide pages
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
            document.getElementById(pageId).classList.add('active');
        }

        // Email validation
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Password validation
        function isValidPassword(password) {
            return password.length >= 6;
        }

        // Signup form validation and submission
        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const enrollment = document.getElementById('signupEnrollment').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;
            
            const errorDiv = document.getElementById('signupError');
            const successDiv = document.getElementById('signupSuccess');
            
            // Reset messages
            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';
            
            // Validation
            if (!name || !enrollment || !email || !phone || !password) {
                errorDiv.textContent = 'All fields are required!';
                errorDiv.style.display = 'block';
                return;
            }
            
            if (!isValidEmail(email)) {
                errorDiv.textContent = 'Please enter a valid email address!';
                errorDiv.style.display = 'block';
                return;
            }
            
            if (!isValidPassword(password)) {
                errorDiv.textContent = 'Password must be at least 6 characters long!';
                errorDiv.style.display = 'block';
                return;
            }
            
            // Success message
            successDiv.textContent = 'Account created successfully! You can now login.';
            successDiv.style.display = 'block';
            
            // Reset form
            document.getElementById('signupForm').reset();
            
            // Redirect to login after 2 seconds
            setTimeout(() => showPage('login'), 2000);
        });

        // Login form validation and submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userInput = document.getElementById('loginUser').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            const errorDiv = document.getElementById('loginError');
            
            errorDiv.style.display = 'none';
            
            // Check credentials
            let user = null;
            Object.values(users).forEach(u => {
                if ((u.email === userInput || userInput === u.email.split('@')[0]) && u.password === password) {
                    user = u;
                }
            });
            
            if (!user) {
                errorDiv.textContent = 'Invalid email/enrollment or password!';
                errorDiv.style.display = 'block';
                return;
            }
            
            // Remember me functionality
            if (rememberMe) {
                localStorage.setItem('rememberedUser', JSON.stringify({ email: user.email, name: user.name }));
            }
            
            // Update welcome message
            document.getElementById('welcomeMessage').textContent = `Welcome Back, ${user.name}!`;
            
            // Redirect to appropriate dashboard
            if (user.type === 'student') {
                showPage('studentDashboard');
            } else if (user.type === 'teacher') {
                showPage('teacherDashboard');
            } else if (user.type === 'admin') {
                showPage('adminDashboard');
            }
        });

        // Forgot password functionality
        document.getElementById('forgotForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('forgotEmail').value;
            const messageDiv = document.getElementById('otpMessage');
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address!');
                return;
            }
            
            messageDiv.textContent = 'OTP sent to your email! Use: 123456';
            messageDiv.style.display = 'block';
            document.getElementById('otpSection').style.display = 'block';
        });

        function resetPassword() {
            const otp = document.getElementById('otpInput').value;
            const newPassword = document.getElementById('newPassword').value;
            
            if (otp !== '123456') {
                alert('Invalid OTP!');
                return;
            }
            
            if (!isValidPassword(newPassword)) {
                alert('Password must be at least 6 characters long!');
                return;
            }
            
            alert('Password reset successful! Please login with your new password.');
            showPage('login');
        }

        function logout() {
            localStorage.removeItem('rememberedUser');
            showPage('login');
        }

        // Check for remembered user on page load
        window.addEventListener('load', function() {
            createMatrixRain();
            
            const remembered = localStorage.getItem('rememberedUser');
            if (remembered) {
                const user = JSON.parse(remembered);
                document.getElementById('loginUser').value = user.email;
                document.getElementById('rememberMe').checked = true;
            }
        });

        // Add some interactive effects
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn')) {
                // Button click effect
                e.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 100);
            }
        });
