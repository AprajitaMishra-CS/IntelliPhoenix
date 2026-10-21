export function authorizeRoles(...allowedRoles){
    return function (req, res, next){
        // firstly authMiddleware run before this middleware
        if(!req.user){
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource",
            });
        }

        next();
    };
}