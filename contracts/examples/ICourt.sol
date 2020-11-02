pragma solidity =0.6.6;

interface ICourt {

    function setConfig(
        uint64 _fromTermId,
        address _feeToken,
        uint256[3] calldata _fees,
        uint64[5] calldata _roundStateDurations,
        uint16[2] calldata _pcts,
        uint64[4] calldata _roundParams,
        uint256[2] calldata _appealCollateralParams,
        uint256[3] calldata _jurorsParams
    ) external;

    function getConfig(uint64 _termId) external view
    returns (
        address feeToken,
        uint256[3] memory fees,
        uint64[5] memory roundStateDurations,
        uint16[2] memory pcts,
        uint64[4] memory roundParams,
        uint256[2] memory appealCollateralParams,
        uint256[3] memory jurorsParams
    );

    function ensureCurrentTerm() external returns (uint64);
}
