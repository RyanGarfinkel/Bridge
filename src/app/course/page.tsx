'use client';

import { useEffect } from 'react';

const CoursePageRedirect = () => {
    
    useEffect(() => {

        window.location.href = '/dashboard';
    });
};

export default CoursePageRedirect;