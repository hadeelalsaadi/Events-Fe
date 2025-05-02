
// Help  function to format dates safely
export const formatEventDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }
        return date.toLocaleString(undefined, {
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error("Error formatting date:", error);
        return 'Error formatting date';
    }
}


// export const formatForBackend=(isoInput)=> {
//     const date = new Date(isoInput);
//     if (isNaN(date.getTime())) {
//       throw new Error("Invalid date format");
//     }
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
//     const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
//   }