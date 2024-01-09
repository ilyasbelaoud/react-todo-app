import PropTypes from "prop-types";

export const TaskPropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};

export const AppProviderPropTypes = {
    children: PropTypes.node.isRequired,
};

export const AlertPropTypes = {
    msg: PropTypes.string.isRequired,
};