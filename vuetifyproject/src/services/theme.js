
const themeService = {
    Save(theme) {
        localStorage.setItem('theme',theme)
    },
    Get() {
        return localStorage.getItem('theme')
    }
}
export default themeService