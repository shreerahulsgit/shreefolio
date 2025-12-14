import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import TargetCursor from './lib/components/target-cursor.jsx';
import NavigationBar from './lib/components/navigation-bar.jsx';

const HomePage = lazy(() => import('./routes/home-page.jsx'));
const AboutPage = lazy(() => import('./routes/about-page.jsx'));
const ProjectsPage = lazy(() => import('./routes/project-page.jsx'));

const BeyondMain = lazy(() => import('./routes/beyond/beyond-main.jsx'));
const BeyondBooks = lazy(() => import('./routes/beyond/beyond-books.jsx'));
const BeyondMusic = lazy(() => import('./routes/beyond/beyond-music.jsx'));

const ResumeMain = lazy(() => import('./routes/resume-main.jsx'));
const ContactMain = lazy(() => import('./routes/contact-main.jsx'));

const SkillsMain = lazy(() => import('./routes/skills/skills-main.jsx'));
const CertificatePage = lazy(() => import('./routes/skills/skills-cert.jsx'));

const routeMap = {
    '/': 'Home',
    '/about': 'About',
    '/projects': 'Projects',
    '/beyond/books': 'Special',
    '/beyond/music': 'Special',
    '/resume': 'Resume',
    '/contact': 'Contact',
    '/skills': 'Skills',
    '/skills/details': 'Skills',
    '/skills/certificates': 'Skills',
};

function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);

    const currentPage = routeMap[location.pathname] || '';
    const showNavbar = !!currentPage;
    const showTargetCursor = location.pathname === null;

    return (
        <>
            {showTargetCursor && (
                <TargetCursor spinDuration={2} hideDefaultCursor={true} />
            )}
            {showNavbar && (
                <NavigationBar
                    currentPage={currentPage}
                    onHomeClick={() => navigate('/')}
                    onAboutClick={() => navigate('/about')}
                    onProjectsClick={() => navigate('/projects')}
                    onSpecialClick={() => navigate('/beyond')}
                    onResumeClick={() => navigate('/resume')}
                    onContactClick={() => navigate('/contact')}
                    onSkillsClick={() => navigate('/skills')}
                />
            )}
            {children}
        </>
    );
}

export default function App() {
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    return (
        <BrowserRouter>
            <Layout>
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />

                        <Route path="/about" element={<AboutPage />} />
                        <Route
                            path="/about/*"
                            element={<Navigate to="/about" replace />}
                        />

                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route
                            path="/projects/*"
                            element={<Navigate to="/projects" replace />}
                        />

                        <Route path="/beyond" element={<BeyondMain />} />
                        <Route path="/beyond/books" element={<BeyondBooks />} />
                        <Route path="/beyond/music" element={<BeyondMusic />} />
                        <Route
                            path="/beyond/*"
                            element={<Navigate to="/beyond" replace />}
                        />

                        <Route path="/resume" element={<ResumeMain />} />
                        <Route
                            path="/resume/*"
                            element={<Navigate to="/resume" replace />}
                        />

                        <Route path="/contact" element={<ContactMain />} />
                        <Route
                            path="/contact/*"
                            element={<Navigate to="/contact" replace />}
                        />

                        <Route path="/skills" element={<SkillsMain />} />
                        <Route
                            path="/skills/certificates"
                            element={<CertificatePage />}
                        />
                        <Route
                            path="/skills/*"
                            element={<Navigate to="/skills" replace />}
                        />

                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </Layout>
        </BrowserRouter>
    );
}
