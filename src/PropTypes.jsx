import PropTypes from "prop-types";

export const TaskPropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    color: PropTypes.string,
    index: PropTypes.number.isRequired,
};

export const AppProviderPropTypes = {
    children: PropTypes.node.isRequired,
};

export const AlertPropTypes = {
    msg: PropTypes.string.isRequired,
};