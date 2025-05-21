const baseUrl = "http://localhost:8000/api/v1/"

async function fetchUser() {
    try {
        const response = await fetch(baseUrl + "profile/me/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        })

        if (response.status === 200) {
            const data = await response.json()
            return data;
        }
    } catch (error) {
        console.error(error)
    }
}