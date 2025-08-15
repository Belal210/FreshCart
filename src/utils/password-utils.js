export function checkPasswordStrength(password) {
    let strength = 0
    let feedback = {text: "" , width: "" , background: ""}

    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$^&*%?]/.test(password)) strength++;

    switch (strength) {
        case 1 :
            feedback.text = "Very weak";
            feedback.width = "w-1/6";
            feedback.background = "bg-red-500";
            break;
        case 2 :
            feedback.text = "Weak";
            feedback.width = "w-2/6";
            feedback.background = "bg-orange-500";
            break;
        case 3 :
            feedback.text = "Fair";
            feedback.width = "w-3/6";
            feedback.background = "bg-yellow-500";
            break;
        case 4 :
            feedback.text = "Good";
            feedback.width = "w-4/6";
            feedback.background = "bg-lime-500";
            break;
        case 5 :
            feedback.text = "Strong";
            feedback.width = "w-5/6";
            feedback.background = "bg-primary-400";
            break;
        case 6 :
            feedback.text = "Very Strong";
            feedback.width = "w-full";
            feedback.background = "bg-primary-500";
            break;
    }

    return feedback;
}